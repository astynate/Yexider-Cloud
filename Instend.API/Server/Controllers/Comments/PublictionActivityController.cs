﻿using Exider.Repositories.Comments;
using Exider.Services.Internal.Handlers;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Mvc;
using static Exider.Core.Models.Links.AlbumLinks;

namespace Exider_Version_2._0._0.Server.Controllers.Comments
{
    [ApiController]
    [Route("[controller]")]
    public class PublictionActivityController : ControllerBase
    {
        private readonly ICommentBaseRepository<AttachmentCommentLink> _commentsRepository;

        private readonly IRequestHandler _requestHandler;

        public PublictionActivityController(ICommentBaseRepository<AttachmentCommentLink> commentsRepository, IRequestHandler requestHandler)
        {
            _commentsRepository = commentsRepository;
            _requestHandler = requestHandler;
        }

        [HttpPost]
        [Authorize]
        [Route("/api/publiction-activity/like")]
        public async Task<IActionResult> SetLike(Guid id)
        {
            var userId = _requestHandler.GetUserId(Request.Headers["Authorization"]);

            if (userId.IsFailure)
            {
                return BadRequest(userId.Error);
            }

            var result = await _commentsRepository.SetLike(id, Guid.Parse(userId.Value));

            if (result.IsFailure)
            {
                return Conflict(result.Error);
            }

            return Ok(result.Value);
        }
    }
}