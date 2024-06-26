﻿using CSharpFunctionalExtensions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exider.Core.Models.Public
{
    [Table("communities")]
    public class CommunityModel
    {
        [Column("id")][Key] public Guid Id { get; private set; }
        [Column("name")] public string Name { get; private set; } = string.Empty;
        [Column("description")] public string Description { get; private set; } = string.Empty;
        [Column("followers")] public ulong Followers { get; private set; } = 0;
        [Column("publications")] public ulong Publications { get; private set; } = 0;
        [Column("avatar")] public string Avatar { get; private set; } = string.Empty;
        [Column("header")] public string Header { get; private set; } = string.Empty;
        [Column("owner_id")] public Guid OwnerId { get; private set; }

        [NotMapped] public int WorldWide { get; set; } = 0;

        private CommunityModel() { }

        public static Result<CommunityModel> Create(Guid id, Guid ownerId, string name, string description, string avatar, string header)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(name))
                return Result.Failure<CommunityModel>("Name is required");

            if (string.IsNullOrEmpty(avatar) || string.IsNullOrWhiteSpace(avatar))
                return Result.Failure<CommunityModel>("Avatar is required");

            if (string.IsNullOrEmpty(header) || string.IsNullOrWhiteSpace(header))
                return Result.Failure<CommunityModel>("Name is required");

            return new CommunityModel()
            {
                Id = id,
                Name = name,
                Description = description,
                Avatar = avatar,
                Header = header,
                OwnerId = ownerId
            };
        }

        public void SetAvatar(string str) => Avatar = str;
        public void SetHeader(string str) => Header = str;
        public void IncrementFollowers() => Followers++;
        public void DecrementFollowers() => Followers--;

        public Result UpdateName(string? value)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
            {
                return Result.Failure("Name is required");
            }

            Name = value;
            return Result.Success();
        }

        public Result UpdateDescription(string? value)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
            {
                return Result.Failure("Name is required");
            }

            Description = value;
            return Result.Success();
        }
    }
}