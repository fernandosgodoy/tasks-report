using Microsoft.Extensions.DependencyInjection;
using TasksReportManager.EFPersistence.Repositories;

namespace TasksReportManager.API.Infra
{
  public static class RepositoriesScopeExtension
  {
    public static IServiceCollection AddRepositoriesScope(this IServiceCollection service)
    {
      service.AddScoped<TaskTypeRepository>();
      service.AddScoped<ActivityRepository>();
      service.AddScoped<ActivityTaskRepository>();
      return service;
    }
  }
}
