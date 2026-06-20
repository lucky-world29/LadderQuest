namespace LadderQuest.Server.Services;

public class WordLadderService
{
    private readonly List<(string Start, string End)> _puzzles =
    [
        ("cold", "warm"),
        ("head", "tail"),
        ("love", "hate"),
        ("game", "play"),
        ("moon", "star")
    ];

    public (string StartWord, string EndWord) GeneratePuzzle()
    {
        var random = new Random();

        var puzzle = _puzzles[random.Next(_puzzles.Count)];

        return (puzzle.Start, puzzle.End);
    }

    public bool IsValidMove(string current, string next)
    {
        if (current.Length != next.Length)
            return false;

        int differences = 0;

        for (int i = 0; i < current.Length; i++)
        {
            if (current[i] != next[i])
                differences++;
        }

        return differences == 1;
    }

    public bool ValidateLadder(List<string> words)
    {
        for (int i = 0; i < words.Count - 1; i++)
        {
            if (!IsValidMove(words[i], words[i + 1]))
                return false;
        }

        return true;
    }
}