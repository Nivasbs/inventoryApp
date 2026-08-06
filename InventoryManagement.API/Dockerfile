# Use the official .NET 10 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app/out

# Use the official ASP.NET 10 runtime image for execution
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# Render requires apps to listen on port 10000
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# Set the entrypoint to your compiled DLL (Replace YourProjectName with your actual .csproj name)
ENTRYPOINT ["dotnet", "InventoryManagement.API.dll"]