using CharRanking.Server.Data;
using Microsoft.AspNetCore.Mvc;
using RankingProject.Server.Data;
using CharRanking.Server.Models;
using System.Text.Json;
using nJson = Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace CharRanking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RankingsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;

        public RankingsController(AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        // ----------------------------------------------------------------- //
        // Set Item Collections For All Characters //
        // ----------------------------------------------------------------- //

        // Items collection no. 1 (one piece characters)
        public static readonly Item[] Items1 =
        [
            new Item{Id = 1, Title = "Luffy", ImageId=1, Ranking=0,ItemType=1 },
            new Item { Id = 2, Title = "Zoro", ImageId = 2, Ranking = 0, ItemType = 1 },
            new Item { Id = 3, Title = "Nami", ImageId = 3, Ranking = 0, ItemType = 1 },
            new Item { Id = 4, Title = "Usopp", ImageId = 4, Ranking = 0, ItemType = 1 },
            new Item { Id = 5, Title = "Sanji", ImageId = 5, Ranking = 0, ItemType = 1 },
            new Item { Id = 6, Title = "Chopper", ImageId = 6, Ranking = 0, ItemType = 1 },
            new Item { Id = 7, Title = "Robin", ImageId = 7, Ranking = 0, ItemType = 1 },
            new Item { Id = 8, Title = "Franky", ImageId = 8, Ranking = 0, ItemType = 1 },
            new Item { Id = 9, Title = "Brook", ImageId = 9, Ranking = 0, ItemType = 1 },
            new Item { Id = 10, Title = "Smoker", ImageId = 10, Ranking = 0, ItemType = 1 }
        ];

        // Items collection no. 2 (dragon ball characters)
        public static readonly Item[] Items2 =
        [
            new Item{Id = 11, Title = "Goku", ImageId=11, Ranking=0,ItemType=2 },
            new Item{Id = 12, Title = "Vegeta", ImageId=12, Ranking=0,ItemType=2 },
            new Item{Id = 13, Title = "Gohan", ImageId=13, Ranking=0,ItemType=2 },
            new Item{Id = 14, Title = "Piccolo", ImageId=14, Ranking=0,ItemType=2 },
            new Item{Id = 15, Title = "Future Trunks", ImageId=15, Ranking=0,ItemType=2 },
            new Item{Id = 16, Title = "Krillin", ImageId=16, Ranking=0,ItemType=2 },
            new Item{Id = 17, Title = "Android 18", ImageId=17, Ranking=0,ItemType=2 },
            new Item{Id = 18, Title = "Android 17", ImageId=18, Ranking=0,ItemType=2 },
            new Item{Id = 19, Title = "Tien", ImageId=19, Ranking=0,ItemType=2 },
            new Item{Id = 20, Title = "Master Roshi", ImageId=20, Ranking=0,ItemType=2 }
        ];

        // Store all the collections in array
        public static readonly Item[][] ItemsCollection =
        [
            Items1,
            Items2
        ];

        // ----------------------------------------------------------------- //
                          // Get Ranking Data By Type & User //
        // ----------------------------------------------------------------- //

        // Get ranking object by item type and user id
        [HttpGet("{itemType:int}&{userId}")]
        public Item[] Get(int itemType, string userId)
        {
            // Find the ranking object based on itemType and userId
            var ranking = _dbContext.Rankings.Where(i => i.ItemType == itemType && i.AppUserID == userId).FirstOrDefault();

            if (ranking != null)
            {
                // Convert the string into items array
                var items = nJson.JsonConvert.DeserializeObject<Item[]>(ranking.ItemsRank);

                if (items != null)
                {
                    // Return the items array in the response body
                    return items;
                }

                // Return empty array
                return [];
            }

            // Return empty array
            return [];
        }

        // ----------------------------------------------------------------- //
                            // Get All User Ranking Data //
        // ----------------------------------------------------------------- //

        // Get all ranking objects by user id
        [HttpGet("{userId}")]
        public ActionResult<List<Ranking>> GetRankingDataByUserId(string userId)
        {
            // Find all the ranking objects that belongs to the userId
            var rankings = _dbContext.Rankings.Where(r => r.AppUserID == userId).ToList();

            if (rankings.IsNullOrEmpty())
            {
                // 404 Not Found if there are no rankings found
                return NotFound();
            }

            // 200 OK with the rankings in the response body
            return Ok(rankings);
        }

        // ----------------------------------------------------------------- //
                        // Reload Ranking Data (GET) //
        // ----------------------------------------------------------------- //

        // Reload the items collection by item type (to reastart their rankings)
        [HttpGet("reload:{itemType:int}")]
        public Item[] Reload(int itemType)
        {
            // Return the items of the relevant item type
            return ItemsCollection[itemType - 1];
        }

        // ----------------------------------------------------------------- //
                            // Create Ranking Data //
        // ----------------------------------------------------------------- //

        // Add new ranking data to a user by id
        [HttpPost("{userId}")]
        public IActionResult Add(string userId)
        {
            try
            {
                // Get the user from database by ID
                var user = _userManager.Users.Where(i => i.Id == userId).FirstOrDefault();

                if (user == null)
                {
                    // 404 Not Found if user does not exist
                    return NotFound("User not found.");
                }

                // Create list to store all ranking objects to create
                var rankings = new List<Ranking>();

                // Create list to store all the item collections strings
                List<string> itemsRankCollection = new List<string>();

                foreach (Item[] item in ItemsCollection)
                {
                    // Serialize each item collection to JSON string
                    itemsRankCollection.Add(JsonSerializer.Serialize(item));

                }

                // Add ranking data for all collections
                for (int i = 1; i <= itemsRankCollection.Count; i++)
                {
                    var ranking = _dbContext.Rankings.Where(r => r.ItemType == i && r.AppUserID == userId).FirstOrDefault();

                    // Create ranking data only if it doesn't exist yet
                    if (ranking == null)
                    {
                        rankings.Add(new Ranking { ItemType = i, ItemsRank = itemsRankCollection[i - 1], AppUserID = userId });
                    }
                }

                // Add the ranking objects to the database
                _dbContext.Rankings.AddRange(rankings);
                _dbContext.SaveChanges();

                // 201 Created with the ranking objects list in the response body
                return CreatedAtAction(nameof(GetRankingDataByUserId), new { userId }, rankings);
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // ----------------------------------------------------------------- //
                            // Update Ranking Data //
        // ----------------------------------------------------------------- //

        [HttpPut("{itemType:int}&{userId}&{itemsRank}")]
        public IActionResult Update(int itemType, string userId, string itemsRank)
        {
            // Find the ranking object based on itemType and userId
            var ranking = _dbContext.Rankings.Where(i => i.ItemType == itemType && i.AppUserID == userId).FirstOrDefault();

            if (ranking == null)
            {
                // 404 Not Found if the ranking object does not exist
                return NotFound();
            }

            // Update the items rank data to the database
            ranking.ItemsRank = itemsRank;
            _dbContext.SaveChanges();

            // 200 OK with the ranking object in the response body
            return Ok(ranking);
        }
    }
}
