using CharRanking.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace CharRanking.Server.Data
{
    public class AppUser : IdentityUser
    {
        public ICollection<Ranking> Rankings { get; set; } = new List<Ranking>();
    }
}
