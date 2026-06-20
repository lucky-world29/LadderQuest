using BCrypt.Net;
using LadderQuest.Server.Auth;
using LadderQuest.Server.Data;
using LadderQuest.Server.DTOs;
using LadderQuest.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LadderQuest.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(
        ApplicationDbContext context,
        JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = await _context.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (exists)
            return BadRequest("Email already exists");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            return Unauthorized("Invalid email or password");

        var valid = BCrypt.Net.BCrypt.Verify(
            dto.Password,
            user.PasswordHash);

        if (!valid)
            return Unauthorized("Invalid email or password");

        var token = _jwtService.GenerateToken(
            user.Id,
            user.Email);

        return Ok(new
        {
            Token = token
        });
    }
}