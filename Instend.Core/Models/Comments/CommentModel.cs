﻿using CSharpFunctionalExtensions;
using Exider.Core.Models.Storage;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exider.Core.Models.Comments
{
    [Table("comments")]
    public class CommentModel
    {
        [Column("id")][Key] public Guid Id { get; private set; } = Guid.NewGuid();
        [Column("text")] public string Text { get; private set; } = string.Empty;
        [Column("date")] public DateTime Date { get; private set; } = DateTime.Now;
        [Column("likes")] public uint Likes { get; private set; } = 0;
        [Column("comments")] public uint Comments { get; private set; } = 0;
        [Column("views")] public uint Views { get; private set; } = 0;
        [Column("owner_id")] public Guid OwnerId { get; private set; }

        [NotMapped] public AttachmentModel[] attechments { get; set; } = new AttachmentModel[0];
        [NotMapped] public bool IsLiked { get; set; } = false;

        private CommentModel() { }

        public static Result<CommentModel> Create(string text, Guid ownerId)
        {
            if (string.IsNullOrEmpty(text) || string.IsNullOrWhiteSpace(text))
            {
                return Result.Failure<CommentModel>("Invalid text");
            }

            if (ownerId == Guid.Empty)
            {
                return Result.Failure<CommentModel>("Invalid user id");
            }

            return new CommentModel()
            {
                Text = text,
                OwnerId = ownerId
            };
        }

        public Result SetAttachment(AttachmentModel[] attachment)
        {
            attechments = attachment;
            return Result.Success();
        }

        public void IncrementLikes() => Likes++;
        public void DecrementLikes() => Likes--;
    }
}