namespace LadderQuest.Server.DTOs.Game
{
    public class GameHistoryDto
    {
        public string StartWord { get; set; } = string.Empty;

        public string EndWord { get; set; } = string.Empty;

        public int Score { get; set; }

        public DateTime PlayedAt { get; set; }
    }
}
