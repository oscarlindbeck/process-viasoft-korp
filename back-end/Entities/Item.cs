namespace back_end.Entities
{
    public class Item
    {
        public Guid id { get; set; } = Guid.NewGuid();
        public required string description { get; set; }
        public required float quantity { get; set; }
        public required string unit_measure{ get; set; }
    }
}
