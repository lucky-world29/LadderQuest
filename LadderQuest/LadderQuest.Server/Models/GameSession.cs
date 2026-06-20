namespace LadderQuest.Server.Models
{
    public class GameSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string StartWord { get; set; } = string.Empty;

        public string EndWord { get; set; } = string.Empty;

        public int Score { get; set; }

        public DateTime PlayedAt { get; set; } = DateTime.UtcNow;
    }
}
