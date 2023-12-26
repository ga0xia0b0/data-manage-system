import Koa from 'koa';
import Router from 'koa-router';
import { koaBody } from 'koa-body';
import cors from '@koa/cors';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import serve from 'koa-static'
import send from 'koa-send'
import path from 'path'
import { fileURLToPath } from 'url';
import { it } from 'node:test';

const db = new Low(new JSONFile('db.json'),{})  
await db.read();

const app = new Koa();
const router = new Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, '../client/build');     // 设置静态资源目录为 build 目录


app.use(cors());        //跨域
app.use(koaBody());   //解析请求体
app.use(serve(staticPath));  // 服务静态资源目录

router.get('/api/tag', async ctx => {
  ctx.body = db.data.tag;
});

router.post('/api/tag', async ctx => {
  db.data.tag.push(ctx.request.body);
  await db.write();
  ctx.body = db.data.tag;
});

router.delete('/api/tag/:key', async ctx => {
  db.data.tag = db.data.tag.filter((item)=>(item.key!==ctx.params.key));
  db.data.tag = db.data.tag.map((item) => {
    if (Number(item.key) > Number(ctx.params.key)) {
      //console.log("here")
      return { ...item, key: String(item.key - 1) };
    } else {
      return item;
    }
  });

  await db.write();
  ctx.body = db.data.tag;
});

router.put('/api/tag/:key', async ctx => {
  db.data.tag = db.data.tag.map((item)=>{
    if(item.key===ctx.params.key){
      return ctx.request.body;
    }else{
      return item;
    }
  })
  await db.write();
  ctx.body = db.data.tag;
});

router.get('/api/data', async ctx => {
  ctx.body = db.data.data;
});

router.post('/api/data', async ctx => {
  db.data.data.push(ctx.request.body);
  await db.write();
  ctx.body = db.data.data;
});

// router.delete('/api/data/:id', async ctx => {
//   db.data.data = db.data.data.filter((item)=>(item.id!==ctx.params.id));
//   await db.write();
//   ctx.body = db.data.data;
// });

router.delete('/api/data/:id', async ctx => {
  const idToDelete = ctx.params.id;
  db.data.data = db.data.data.filter((item) => item.id !== idToDelete);
  db.data.data = db.data.data.map((item) => {
    if (item.id > idToDelete) {
      return { ...item, id: String(item.id - 1) };
    } else {
      return item;
    }
  });
  await db.write();
  ctx.body = db.data.data;
});

router.put('/api/data/:id', async ctx => {
  db.data.data = db.data.data.map((item)=>{
    if(item.id===ctx.params.id){
      return ctx.request.body;
    }else{
      return item;
    }
  })
  await db.write();
  ctx.body = db.data.data;
});

router.get('/api/en', async ctx => {
  ctx.body = db.data.en;
});

router.get('/api/fr', async ctx => {
  ctx.body = db.data.fr;
});

router.get('/api/jp', async ctx => {
  ctx.body = db.data.jp;
});

router.get('/api/zh', async ctx => {
  ctx.body = db.data.zh;
});

router.get('/api/lngsetting', async ctx => {
  ctx.body = db.data.lngsetting;
});

router.put('/api/lngsetting/', async ctx => {
  db.data.lngsetting = Object.keys(ctx.request.body)[0];
  await db.write();
  ctx.body = db.data.lngsetting;
});

app.use(router.routes());

// 对于找不到的静态资源统一返回 index.html，由 React Router 处理
app.use(async (ctx) => {
  await send(ctx, 'index.html', { root: staticPath })
})

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});