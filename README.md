# nodejs 微服务项目模板。

> 本模板用于创建基本的后端项目脚手架，基于 Koa2.0 开发。

## 1、目录结构

```
- 根目录
  - bin 执行文件
  - config 按环境变量的配置文件
  - constants 常量
  - controllers 控制器，连接路由和服务层
  - libs 常用库，包括第三方库、工具类方法等
  - middleware 中间件
  - migrations sequelize migrations，存储表创建、表修改等脚本
  - models 模型，对应数据表
  - node_modules 第三方库
  - pm2config 按环境变量的pm2启动文件
  - routes 路由
  - scripts 可单独执行的脚本
  - seeders sequelize seeders，存储需要添加到DB的数据
  - services 服务层，处理底层业务逻辑
  - tasks 定时任务
  - .eslintrc.js eslint配置文件
  - .gitignore git忽略文件
  - apidoc.js api文档生成执行文件
  - apidoc.json api文档生成配置文件
  - app.js koa应用实例化的文件，生成应用入口
  - Dockerfile 容器化配置文件
  - log.js 日志实例化文件，生成日志记录文件
  - newrelic.js 接口监控第三方插件，按需加载
  - package.json
  - README.md
```

## 2. 使用方法

### 2.1 创建 model

#### 逆向创建 models

`sequelize-auto -h your_host -p your_db_port -u your_username -x your_password -d your_database -C`

#### 创建 migrations

`$ sequelize migration:generate --name xxx --models-path "models/xxx"`
通过此方法，可以手动创建一个空的 migration 文件，其中的 up/down 方法都是空的。

#### 执行 migration，生成数据表

`sequelize db:migrate`

### 2.2 创建 controller

`参照controllers/test.js`

### 2.3 创建 service

`参照services/test.js`

### 2.4 安装模块

`npm install`

### 2.5 运行

`npm run dev`

## 3. 关于日志

### 3.1 基础功能

- 可添加 request id，且大并发时，每个请求的 request id 不会混淆
- 可格式化日志输出内容
- 可分类型存储日志，例如按业务日志、数据库日志存储等
- 可自动压缩日志文件、按日期命名、可配置保留时间等
- 可打印纯粹的日志，例如 log.info({data: xxx})，纯粹日志就只包含{data: xxx}，不包含 request id，level 等

基础日志模块入口位于 log.js 文件中，导出了:

- biz，db 两个日志类型，分别用于记录业务和数据库日志，不同类型的日志将会分文件存储；
- `getReqIdLogger`方法，用于将 request ID 附加到日志输出中；

### 3.2 使用方法

```
const log = require("./log");
log.biz.info("log message");
//输出：{"categoryName":"biz","level":"info","appName":"xxxx","date":"2020-02-14 16:50:42.119","data":"log message"}

log.biz.info("log message");
//输出：{"categoryName":"db","level":"info","appName":"xxxx","date":"2020-02-14 16:50:42.119","data":"log message"}

let reqLog = log.getReqIdLogger("req-id-123", "biz");
reqLOg.biz.info("log message");
//输出：{"requestId":"req-id-123","categoryName":"biz","level":"info","appName":"xxxx","date":"2020-02-14 17:23:20.266","data":"log message"}
```

### 3.3 关于 controller、service、model 中日志输出

在微服务架构中，为了更方便的追踪请求链路，使用 request ID 可以将所有请求日志都串联起来。故在请求从网关进入时就必须加上 request ID，然后依次将 request ID 在 controller、service、model 中传递，保证所有日志输出都加上请求 ID。
