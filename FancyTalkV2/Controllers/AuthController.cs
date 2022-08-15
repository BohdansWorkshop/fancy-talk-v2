using FancyTalkV2.Models;
using FancyTalkV2.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FancyTalkV2.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly IUserStorage _userStorage;

        public AuthController(IUserStorage userStorage)
        {
            _userStorage = userStorage;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignInAsync(NameDTO input)
        {
            if (_userStorage.UserWithNameExists(input.UserName)) {
                return BadRequest("User with the same name is already logged in!");
            }

            var claims = new List<Claim> { 
                new Claim(type: ClaimTypes.Name, value: input.UserName) 
            };
            await RegisterUser(claims);

            var newUser = new UserModel {
                Name = input.UserName
            };
            _userStorage.AddUser(newUser);
            
            var userClaims = User.Claims.Select(x => new Claim(x.Type, x.Value)).ToList();
            return Ok(input.UserName);
        }

        private async Task RegisterUser(List<Claim> claims)
        {
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                });
        }

        [Authorize]
        [HttpGet("signout")]
        public async Task SignOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        public class NameDTO
        {
            public string UserName { get; set; }
        }
    }
}
