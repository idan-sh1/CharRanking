namespace RankingProject.Server.Data
{
    public class Item
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int ImageId { get; set; }
        public int Ranking { get; set; }
        public int ItemType { get; set; }
    }
}
