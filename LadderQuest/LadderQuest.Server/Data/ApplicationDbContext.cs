using Microsoft.EntityFrameworkCore;
using LadderQuest.Server.Models;

namespace LadderQuest.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<GameSession> GameSessions => Set<GameSession>();

    public DbSet<Word> Words => Set<Word>();
}