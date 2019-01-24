using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SamplePaging.Api
{
    public static class WebApiConfig
    {
        

            public static void Register(HttpConfiguration config)
            {// Web API configuration and services
             config.EnableCors();
              var cors = new EnableCorsAttribute("*", "*", "*");
             config.EnableCors(cors);

                config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling
                   = ReferenceLoopHandling.Serialize;

                config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling
                     = PreserveReferencesHandling.Objects;

                //config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));

                var formatters = GlobalConfiguration.Configuration.Formatters;
                var jsonFormatter = formatters.JsonFormatter;
                var settings = jsonFormatter.SerializerSettings;
                settings.Formatting = Formatting.Indented;
                settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                config.Formatters.Remove(config.Formatters.XmlFormatter);
                // Configure Web API to use only bearer token authentication.
              //  config.SuppressDefaultHostAuthentication();
              // config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

                // Web API routes
                config.MapHttpAttributeRoutes();

                config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{id}",
                    defaults: new { id = RouteParameter.Optional }
                );
            }
        }
    }
