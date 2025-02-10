using back_end.Data;
using back_end.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/item")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _context.Items.ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _context.Items.SingleOrDefaultAsync(x => x.id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Item item)
        {
            _context.Items.Add(item);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { item.id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Item newItem)
        {
            var item = await _context.Items.SingleOrDefaultAsync(x => x.id == id);

            if (item == null)
            {
                return NotFound();
            }

            item.description = newItem.description;
            item.quantity = newItem.quantity;
            item.unit_measure = newItem.unit_measure;

            _context.Items.Update(item);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var item = await _context.Items.SingleOrDefaultAsync(x => x.id == id);

            if (item == null)
            {
                return NotFound();
            }

            _context.Remove(item);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
