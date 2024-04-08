
import request from "@/utils/request";  //导入封装请求的js文件
 
export function wangzhi(params) {
  return request({
    url: params.url,  //接口路径
    method: params.method,  //接口方法
    // headers: { 'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' }, //给接口添加请求头
    // params  //接口参数
  });
}