using CharRanking.Server.Data;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CharRanking.Server.Models
{
    public class Ranking
    {
        public int Id { get; set; }

        public int ItemType { get; set; }

        public required string ItemsRank { get; set; }

        [ValidateNever]
        public AppUser AppUser { get; set; } = null!;
        public required string AppUserID { get; set; }
    }
}
