using LadderQuest.Server.Data;
using LadderQuest.Server.DTOs.Game;
using LadderQuest.Server.Models;
using LadderQuest.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LadderQuest.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GameController : ControllerBase
{
    private readonly WordLadderService _wordLadderService;
    private readonly ApplicationDbContext _context;

    public GameController(
        WordLadderService wordLadderService,
        ApplicationDbContext context)
    {
        _wordLadderService = wordLadderService;
        _context = context;
    }

    [HttpGet("start")]
    public IActionResult StartGame()
    {
        var puzzle = _wordLadderService.GeneratePuzzle();

        return Ok(new StartGameResponseDto
        {
            StartWord = puzzle.StartWord,
            EndWord = puzzle.EndWord
        });
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitGame(SubmitGameDto request)
    {
        var isValid = _wordLadderService.ValidateLadder(request.Words);

        if (!isValid)
        {
            return BadRequest(new
            {
                Message = "Invalid Word Ladder"
            });
        }

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var gameSession = new GameSession
        {
            UserId = userId,
            StartWord = request.Words.First(),
            EndWord = request.Words.Last(),
            Score = 100,
            PlayedAt = DateTime.UtcNow
        };

        _context.GameSessions.Add(gameSession);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            Message = "Word Ladder Solved!",
            Score = 100
        });
    }

    [HttpGet("history")]
    public IActionResult History()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var games = _context.GameSessions
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.PlayedAt)
            .Select(x => new GameHistoryDto
            {
                StartWord = x.StartWord,
                EndWord = x.EndWord,
                Score = x.Score,
                PlayedAt = x.PlayedAt
            })
            .ToList();

        return Ok(games);
    }
}