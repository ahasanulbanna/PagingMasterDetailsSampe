
namespace SamplePaging.Api.Controllers
{
    public class ResponseMessage<T> : ErrorMessage
    {
        public int Total { get; set; }
        public T Result { get; set; }
    }
}
