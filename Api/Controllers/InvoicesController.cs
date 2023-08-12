using Api.Database;
using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public InvoicesController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetails>>> GetInvoiceDetails()
        {
            if (_context.Invoices == null)
            {
                return NotFound();
            }
            return await _context.Invoices.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetails>> GetInvoiceDetail(int id)
        {
            if (_context.Invoices == null)
            {
                return NotFound();
            }
            var paymentDetail = await _context.Invoices.FindAsync(id);

            if (paymentDetail == null)
            {
                return NotFound();
            }

            return paymentDetail;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, InvoiceDetails paymentDetail)
        {
            if (id != paymentDetail.InvoiceId)
            {
                return BadRequest();
            }

            _context.Entry(paymentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!InvoiceDetailExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<InvoiceDetails>> PostInvoice(InvoiceDetails paymentDetail)
        {
            _context.Invoices.Add(paymentDetail);
            await _context.SaveChangesAsync();

            return Ok(await _context.Invoices.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var paymentDetail = await _context.Invoices.FindAsync(id);
            if (paymentDetail == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(paymentDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool InvoiceDetailExists(int id)
        {
            return (_context.Invoices?.Any(e => e.InvoiceId == id)).GetValueOrDefault();
        }
    }
}
