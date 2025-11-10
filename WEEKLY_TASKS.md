# Penpot 前端迁移 - 周任务清单

## ✅ 总体时间表

**总周期**: 10 周
**开始日期**: 预计第 1 周
**预计完成**: 第 10 周末

---

## 📅 第 1 周：项目初始化和基础设置

### 周目标

- 建立完整的项目结构
- 安装和配置所有开发工具
- 设置 CI/CD 和开发工作流
- 创建基础 utility 函数框架

### 详细任务

#### 任务 1.1：项目结构初始化 (2 小时)

- [ ] 创建目录结构

  ```
  packages/frontend/src/
  ├── lib/              # 核心库
  │   ├── geom/         # 几何计算
  │   ├── math/         # 数学工具
  │   ├── svg/          # SVG 处理
  │   ├── data/         # 数据操作
  │   └── schema/       # Schema 定义
  ├── utils/            # 工具函数
  │   ├── format.ts
  │   ├── parse.ts
  │   ├── dom.ts
  │   ├── string.ts
  │   └── uuid.ts
  ├── types/            # 类型定义
  │   ├── shape.ts
  │   ├── auth.ts
  │   ├── common.ts
  │   ├── path.ts
  │   └── fill.ts
  ├── store/            # 状态管理
  │   ├── index.ts
  │   ├── slices/
  │   ├── selectors/
  │   └── middleware/
  ├── ui/               # UI 组件
  │   ├── components/
  │   ├── pages/
  │   ├── hooks/
  │   ├── forms/
  │   └── styles/
  ├── services/         # 服务层
  │   ├── api/
  │   └── *.service.ts
  ├── routes/           # 路由
  ├── constants/        # 常量
  └── config/           # 配置文件
  ```

- [ ] 创建 TypeScript 配置
  - 更新 `tsconfig.json`
  - 配置路径别名 (@ 指向 src/)
  - 设置严格模式
  - 配置模块解析

- [ ] 创建 RSBuild 配置
  - 更新 `rsbuild.config.ts`
  - 配置开发服务器
  - 设置资源处理
  - 配置 CSS 处理

**验收标准**:

- [ ] 所有目录已创建
- [ ] `tsconfig.json` 包含正确的配置
- [ ] RSBuild 能成功运行 `dev` 和 `build` 命令
- [ ] 路径别名在 IDE 中正常工作

---

#### 任务 1.2：依赖安装和配置 (1.5 小时)

**核心依赖**:

```bash
pnpm add -D \
  typescript@latest \
  @types/node@latest \
  @types/react@latest \
  @types/react-dom@latest
```

**状态管理**:

```bash
pnpm add zustand immer
```

**HTTP 请求**:

```bash
pnpm add axios
```

**路由**:

```bash
pnpm add react-router-dom
```

**UI 和样式**:

```bash
pnpm add \
  @radix-ui/react-primitive \
  @radix-ui/react-dialog \
  @radix-ui/react-popover \
  classnames
```

**开发工具**:

```bash
pnpm add -D \
  eslint \
  prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

**测试工具**:

```bash
pnpm add -D \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom \
  jsdom \
  @playwright/test
```

- [ ] 安装所有依赖
- [ ] 生成 pnpm-lock.yaml
- [ ] 验证所有依赖都能正确导入

**验收标准**:

- [ ] `pnpm install` 成功运行
- [ ] 所有 peer dependencies 已解决
- [ ] 能导入关键包 (zustand, axios, react-router-dom)

---

#### 任务 1.3：ESLint 和 Prettier 配置 (1 小时)

- [ ] 创建 `.eslintrc.json`
- [ ] 创建 `.prettierrc.json`
- [ ] 创建 `.prettierignore`
- [ ] 在 `package.json` 中添加 lint 脚本
- [ ] 测试 linting 和 formatting

**验收标准**:

- [ ] ESLint 规则正确应用
- [ ] Prettier 能格式化代码
- [ ] IDE 集成工作正常

---

#### 任务 1.4：基础 Utility 函数框架 (2 小时)

创建以下文件的基础框架和类型签名：

**`packages/frontend/src/utils/`**:

```
├── format.ts          # formatNumber, formatDate, formatBytes, etc.
├── parse.ts           # parseDate, parseColor, parseNumber, etc.
├── dom.ts             # DOM 操作
├── string.ts          # 字符串操作
├── uuid.ts            # UUID 生成
└── index.ts           # 导出所有工具
```

- [ ] 为每个文件创建类型定义
- [ ] 添加 JSDoc 注释
- [ ] 导出所有函数
- [ ] 创建相应的单元测试文件

**示例代码** (`utils/format.ts`):

```typescript
/**
 * 格式化数字为固定小数位数
 * @param num - 待格式化的数字
 * @param decimals - 小数位数，默认 2
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals);
}

/**
 * 格式化日期
 * @param date - Date 对象或时间戳
 * @param format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number, format = 'YYYY-MM-DD'): string {
  // 实现
}

/**
 * 格式化字节大小
 * @param bytes - 字节数
 * @returns 格式化后的大小字符串，如 '1.23 MB'
 */
export function formatBytes(bytes: number): string {
  // 实现
}

/**
 * 格式化时长
 * @param ms - 毫秒数
 * @returns 格式化后的时长字符串，如 '2h 30m'
 */
export function formatDuration(ms: number): string {
  // 实现
}

// 导出
export default {
  formatNumber,
  formatDate,
  formatBytes,
  formatDuration,
};
```

**验收标准**:

- [ ] 所有 utility 文件已创建
- [ ] 类型定义正确
- [ ] JSDoc 注释完整
- [ ] 导出结构正确

---

#### 任务 1.5：测试基础设置 (1 小时)

- [ ] 创建 `vitest.config.ts`
- [ ] 配置 `vitest` 运行环境
- [ ] 创建 test 目录结构
- [ ] 创建 `test/setup.ts` 全局配置
- [ ] 验证测试能正常运行

**`test/` 目录结构**:

```
test/
├── setup.ts           # 全局设置
├── unit/              # 单元测试
│   ├── utils/
│   ├── lib/
│   ├── store/
│   ├── hooks/
│   ├── services/
│   └── components/
├── integration/       # 集成测试
└── e2e/              # E2E 测试
```

**验收标准**:

- [ ] `pnpm test` 命令能运行
- [ ] 测试框架配置正确
- [ ] 能创建和运行测试文件

---

#### 任务 1.6：CI/CD 初始设置 (30 分钟)

- [ ] 创建 `.github/workflows/` 目录
- [ ] 创建 `lint.yml` workflow
- [ ] 创建 `test.yml` workflow
- [ ] 创建 `build.yml` workflow

**验收标准**:

- [ ] GitHub Actions 配置正确
- [ ] Workflow 能在 push 时触发

---

### 📊 第 1 周总结

| 项目         | 预计时间    | 状态    | 实际情况        |
| ------------ | ----------- | ------- | --------------- |
| 项目结构     | 2h          | ✅      | 已完成          |
| 依赖安装     | 1.5h        | ✅      | 已完成          |
| 工具配置     | 1h          | ✅      | 已完成          |
| Utility 框架 | 2h          | ✅      | 已完成          |
| 测试设置     | 1h          | ⬜      | 待完成          |
| CI/CD 设置   | 0.5h        | ⬜      | 待完成          |
| **周总计**   | **~8 小时** | **75%** | **6/8小时完成** |

---

## 📅 第 2 周：迁移 Utility 函数和 Geom 库

### 周目标

- 完成所有 utility 函数迁移
- 迁移完整的几何计算库
- 建立单元测试覆盖
- 验证数学计算精度

### 详细任务

#### 任务 2.1：格式化和解析工具 (4 小时)

**目标文件**:

- `packages/frontend/src/utils/format.ts` (200 行)
- `packages/frontend/src/utils/parse.ts` (150 行)
- `packages/frontend/src/utils/string.ts` (100 行)

**子任务**:

- [ ] 迁移所有 format 函数
  - formatNumber
  - formatDate (支持多种格式)
  - formatBytes
  - formatDuration
  - formatCurrency
  - formatPercent

- [ ] 迁移所有 parse 函数
  - parseDate
  - parseColor (hex, rgb, rgba)
  - parseNumber
  - parseJSON
  - parseCSV

- [ ] 迁移字符串工具
  - capitalize
  - slugify
  - pascalCase
  - camelCase
  - kebabCase
  - snakeCase
  - truncate
  - startsWith, endsWith, includes
  - split, join, replace

**源代码参考**:
从 `penpot/frontend/src/app/main/utils/` 中提取

**编写单元测试** (4 小时，与迁移并行):

```
test/unit/utils/
├── format.test.ts    (100 行)
├── parse.test.ts     (80 行)
├── string.test.ts    (60 行)
└── uuid.test.ts      (40 行)
```

**验收标准**:

- [ ] 所有函数都已迁移
- [ ] 单元测试覆盖 >90%
- [ ] 所有测试通过
- [ ] 性能与原版相同

---

#### 任务 2.2：DOM 操作工具 (2 小时)

**目标文件**: `packages/frontend/src/utils/dom.ts` (250 行)

**函数列表**:

- [ ] addClass / removeClass / hasClass / toggleClass
- [ ] getComputedStyle
- [ ] getPosition (getBoundingClientRect 包装)
- [ ] getSize (获取元素宽高)
- [ ] setStyle / getStyle / removeStyle
- [ ] createElement / createTextNode
- [ ] insertBefore / appendChild / removeChild
- [ ] addEventListener / removeEventListener
- [ ] on / off (事件委托)
- [ ] trigger (触发自定义事件)
- [ ] preventDef (阻止默认行为和传播)

**编写测试**:

- [ ] 创建 `test/unit/utils/dom.test.ts` (50 行)
- [ ] Mock DOM API
- [ ] 测试所有函数

**验收标准**:

- [ ] 所有 DOM 工具函数已迁移
- [ ] 单元测试通过
- [ ] 支持 TypeScript 类型

---

#### 任务 2.3：UUID 和通用工具 (1 小时)

**目标文件**: `packages/frontend/src/utils/uuid.ts` (50 行)

**函数**:

- [ ] uuidv4 (生成 UUID)
- [ ] isUUID (验证 UUID)
- [ ] 可选：uuidv1

**编写测试**:

- [ ] 创建 `test/unit/utils/uuid.test.ts`

**验收标准**:

- [ ] UUID 生成正确
- [ ] 验证函数工作正常

---

#### 任务 2.4：几何库 - Point (3 小时)

**目标文件**: `packages/frontend/src/lib/geom/point.ts` (100 行)

**源文件**: `penpot/common/src/app/common/geom/point.cljs`

**接口定义**:

```typescript
export interface Point {
  x: number;
  y: number;
}

export interface PointWithId extends Point {
  id: string;
}
```

**函数**:

- [ ] makePoint(x, y): Point
- [ ] pointX(p): number
- [ ] pointY(p): number
- [ ] pointDistance(p1, p2): number
- [ ] pointOffset(p, dx, dy): Point
- [ ] pointScale(p, sx, sy): Point
- [ ] pointRotate(p, angle): Point
- [ ] pointAdd(p1, p2): Point
- [ ] pointSubtract(p1, p2): Point
- [ ] pointMultiply(p, scalar): Point
- [ ] pointDivide(p, scalar): Point
- [ ] pointNormalize(p): Point
- [ ] pointLength(p): number
- [ ] pointDot(p1, p2): number
- [ ] pointCross(p1, p2): number
- [ ] pointFlip(p): Point
- [ ] pointNeg(p): Point

**编写测试**:

- [ ] 创建 `test/unit/lib/geom/point.test.ts` (80 行)
- [ ] 测试所有函数
- [ ] 验证浮点数精度

**验收标准**:

- [ ] 所有函数已迁移
- [ ] 测试覆盖 >95%
- [ ] 精度与原版相同
- [ ] TypeScript 类型正确

---

#### 任务 2.5：几何库 - Matrix (4 小时)

**目标文件**: `packages/frontend/src/lib/geom/matrix.ts` (200 行)

**源文件**: `penpot/common/src/app/common/geom/matrix.cljs`

**接口**:

```typescript
export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}
```

**函数**:

- [ ] makeMatrix(a, b, c, d, e, f): Matrix
- [ ] identityMatrix(): Matrix
- [ ] scaleMatrix(sx, sy): Matrix
- [ ] translateMatrix(tx, ty): Matrix
- [ ] rotateMatrix(angle): Matrix
- [ ] skewMatrix(x, y): Matrix
- [ ] matrixMultiply(m1, m2): Matrix
- [ ] matrixInverse(m): Matrix
- [ ] matrixDet(m): number
- [ ] transformPoint(matrix, point): Point
- [ ] transformVector(matrix, vector): Point
- [ ] matrixFromString(str): Matrix
- [ ] matrixToString(m): string
- [ ] matrixToArray(m): number[]
- [ ] matrixCompose(transforms): Matrix

**编写测试**:

- [ ] 创建 `test/unit/lib/geom/matrix.test.ts` (100 行)
- [ ] 测试矩阵运算
- [ ] 验证变换正确性

**验收标准**:

- [ ] 所有矩阵操作正确
- [ ] 测试通过
- [ ] 性能满足要求

---

#### 任务 2.6：几何库 - Transform (3 小时)

**目标文件**: `packages/frontend/src/lib/geom/transform.ts` (150 行)

**源文件**: `penpot/common/src/app/common/geom/transform.cljs`

**函数**:

- [ ] transformBounds(bounds, matrix): Bounds
- [ ] transformShape(shape, matrix): Shape
- [ ] transformPoints(points, matrix): Point[]
- [ ] transformPath(path, matrix): Path
- [ ] getTransformMatrix(shape): Matrix
- [ ] composeTransforms(transforms): Matrix

**编写测试**:

- [ ] 创建 `test/unit/lib/geom/transform.test.ts` (60 行)

**验收标准**:

- [ ] 变换计算正确
- [ ] 测试通过

---

#### 任务 2.7：几何库 - 其他形状 (2 小时)

**目标文件**: `packages/frontend/src/lib/geom/shapes/` (500+ 行)

**文件**:

- [ ] `line.ts` (50 行)
- [ ] `circle.ts` (80 行)
- [ ] `rect.ts` (100 行)
- [ ] `polygon.ts` (80 行)
- [ ] `intersection.ts` (200 行)

**编写测试**:

- [ ] 创建对应的 `.test.ts` 文件

**验收标准**:

- [ ] 所有形状计算正确
- [ ] 测试覆盖完整

---

#### 任务 2.8：数学库 (2 小时)

**目标文件**: `packages/frontend/src/lib/math.ts` (300 行)

**源文件**: `penpot/common/src/app/common/math.cljs`

**函数**:

- [ ] 三角函数 (sin, cos, tan, atan2)
- [ ] 角度转换 (degreesToRadians, radiansToDegrees)
- [ ] 限制函数 (clamp, min, max)
- [ ] 插值 (lerp, easeInOut, easeIn, easeOut)
- [ ] 舍入 (round, floor, ceil)
- [ ] 随机 (random, randomInt)

**编写测试**:

- [ ] 创建 `test/unit/lib/math.test.ts` (50 行)

**验收标准**:

- [ ] 所有数学函数正确
- [ ] 性能满足要求

---

### 📊 第 2 周总结

| 项目         | 预计时间     | 状态 | 实际情况           |
| ------------ | ------------ | ---- | ------------------ |
| Format/Parse | 4h           | ⬜   | 待完成             |
| String Utils | 1h           | ⬜   | 待完成             |
| DOM Utils    | 2h           | ⬜   | 待完成             |
| UUID         | 1h           | ⬜   | 待完成             |
| Point 几何   | 3h           | ✅   | **已完成** (598行) |
| Matrix 几何  | 4h           | ✅   | **已完成** (435行) |
| Transform    | 3h           | ⬜   | 待完成             |
| 其他形状     | 2h           | ⬜   | 待完成             |
| 数学库       | 2h           | ✅   | **已完成** (304行) |
| 单元测试     | 4h           | ⬜   | 待完成             |
| **周总计**   | **~26 小时** |      |

---

## 📅 第 3-4 周：类型系统迁移

### 周目标

- 完成 Shape 和几何类型定义
- 完成 API 和认证类型
- 建立 Schema 验证
- 完成类型实用函数

### 主要任务

#### 任务 3.1：Shape 类型 (6 小时)

- [ ] 定义 BaseShape 接口
- [ ] 定义所有 Shape 变体
- [ ] 定义 Shape 工具函数
- [ ] 创建 Type Guards
- 文件：`packages/frontend/src/types/shape.ts` (500+ 行)

#### 任务 3.2：路径和填充类型 (4 小时)

- [ ] 定义 Path 接口
- [ ] 定义 Fill 接口
- [ ] 定义 Stroke 接口
- 文件：
  - `packages/frontend/src/types/path.ts` (200 行)
  - `packages/frontend/src/types/fill.ts` (150 行)

#### 任务 3.3：认证和通用类型 (4 小时)

- [ ] 迁移 Auth 类型
- [ ] 迁移 Common 类型
- [ ] 定义 API Response 类型
- 文件：
  - `packages/frontend/src/types/auth.ts` (200 行)
  - `packages/frontend/src/types/common.ts` (300 行)
  - `packages/frontend/src/types/api.ts` (150 行)

#### 任务 3.4：Schema 和验证 (3 小时)

- [ ] 创建 Schema 工具
- [ ] 定义验证函数
- 文件：`packages/frontend/src/lib/schema.ts` (200 行)

**第 3-4 周总计**: ~17 小时

---

## 📅 第 5-6 周：状态管理迁移

### 周目标

- 建立 Zustand store
- 迁移所有状态切片
- 实现 selectors
- 建立中间件

### 主要任务

#### 任务 5.1：Store 和中间件 (3 小时)

- [ ] 创建 Zustand store
- [ ] 实现 persistence 中间件
- [ ] 实现 logging 中间件
- 文件：
  - `packages/frontend/src/store/index.ts`
  - `packages/frontend/src/store/middleware/`

#### 任务 5.2：状态切片 (8 小时)

- [ ] Auth 切片
- [ ] Common 切片
- [ ] Modal 切片
- [ ] Notifications 切片
- [ ] Dashboard 切片
- [ ] Workspace 切片
- [ ] Selection 切片

#### 任务 5.3：Selectors (2 小时)

- [ ] 创建所有 selector 函数
- [ ] 优化 selector 性能

#### 任务 5.4：测试 (3 小时)

- [ ] 编写 store 单元测试
- [ ] 编写集成测试

**第 5-6 周总计**: ~16 小时

---

## 📅 第 7-8 周：UI 组件和 Hooks 迁移

### 周目标

- 迁移所有基础 UI 组件
- 迁移所有 Hooks
- 完成页面组件
- 实现页面功能

### 主要任务

#### 任务 7.1：基础组件 (4 小时)

- [ ] Button, Input, Select 等
- [ ] 表单组件
- [ ] UI 组件库

#### 任务 7.2：容器组件 (3 小时)

- [ ] 布局组件
- [ ] 对话框组件
- [ ] Popover 等

#### 任务 7.3：Hooks (3 小时)

- [ ] useAuth, useWorkspace 等
- [ ] 自定义 hooks

#### 任务 7.4：页面组件 (8 小时)

- [ ] 认证页面
- [ ] 仪表板页面
- [ ] 工作区页面

#### 任务 7.5：测试 (2 小时)

- [ ] 组件测试
- [ ] 集成测试

**第 7-8 周总计**: ~20 小时

---

## 📅 第 9 周：Services 和路由集成

### 周目标

- 迁移所有 Service 层
- 完成路由配置
- 集成 API 客户端
- 完成认证流程

### 主要任务

#### 任务 9.1：API 客户端 (2 小时)

- [ ] 创建 Axios 客户端
- [ ] 配置请求/响应拦截器
- [ ] 错误处理

#### 任务 9.2：Service 类 (4 小时)

- [ ] AuthService
- [ ] ProjectService
- [ ] FileService
- [ ] WorkspaceService

#### 任务 9.3：路由 (2 小时)

- [ ] 创建路由配置
- [ ] 实现 PrivateRoute
- [ ] 设置页面路由

#### 任务 9.4：集成和测试 (2 小时)

- [ ] 集成所有模块
- [ ] 端到端测试

**第 9 周总计**: ~10 小时

---

## 📅 第 10 周：优化和收尾

### 周目标

- 性能优化
- E2E 测试完整覆盖
- 文档完善
- 项目发布准备

### 主要任务

#### 任务 10.1：性能优化 (3 小时)

- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle size 优化
- [ ] 渲染性能优化

#### 任务 10.2：E2E 测试 (3 小时)

- [ ] 完整用户流程测试
- [ ] 跨浏览器测试

#### 任务 10.3：文档和部署 (2 小时)

- [ ] README 更新
- [ ] API 文档
- [ ] 部署脚本

#### 任务 10.4：代码审查和修复 (2 小时)

- [ ] 代码审查
- [ ] Bug 修复
- [ ] 最终测试

**第 10 周总计**: ~10 小时

---

## 📈 整体进度追踪

### 按优先级统计

```
🔴 高优先级：
  周 1-2：Utility + Geom
  周 3-4：Types + Auth
  周 5-6：Store + State
  周 7-8：UI + Pages
  周 9：Services
  预计时间：~69 小时

🟡 中优先级：
  周 7-8：测试
  周 10：优化
  预计时间：~10 小时

🟢 低优先级：
  周 10：文档和部署
  预计时间：~4 小时

总计：~83 小时（约 2 周全职工作）
```

### 每周时间分配

| 周       | 阶段            | 预计小时 | 难度   | 优先级 |
| -------- | --------------- | -------- | ------ | ------ |
| 1        | 初始化          | 8        | ⭐     | 🔴 高  |
| 2        | Util + Geom     | 26       | ⭐⭐   | 🔴 高  |
| 3        | Type - 前半     | 10       | ⭐⭐   | 🔴 高  |
| 4        | Type - 后半     | 7        | ⭐⭐   | 🔴 高  |
| 5        | Store - 前半    | 10       | ⭐⭐⭐ | 🔴 高  |
| 6        | Store - 后半    | 6        | ⭐⭐⭐ | 🔴 高  |
| 7        | UI/Hooks - 前半 | 12       | ⭐⭐⭐ | 🔴 高  |
| 8        | UI/Hooks - 后半 | 8        | ⭐⭐   | 🔴 高  |
| 9        | Services        | 10       | ⭐⭐   | 🔴 高  |
| 10       | 优化/完成       | 10       | ⭐     | 🟡 中  |
| **总计** |                 | **107**  |        |        |

---

## 🎯 关键里程碑

### Milestone 1：基础环境就绪 (第 1 周末)

- [ ] 项目结构完成
- [ ] 开发环境配置成功
- [ ] 首个 Util 函数单元测试通过

### Milestone 2：核心库完成 (第 2 周末)

- [ ] 所有 Utility 函数迁移完成
- [ ] 所有几何库函数迁移完成
- [ ] 单元测试覆盖 >90%

### Milestone 3：类型系统完成 (第 4 周末)

- [ ] 所有类型定义完成
- [ ] Type Guards 实现完成
- [ ] Schema 验证完成

### Milestone 4：状态管理完成 (第 6 周末)

- [ ] Zustand store 配置完成
- [ ] 所有状态切片迁移完成
- [ ] Store 测试覆盖 >80%

### Milestone 5：UI 层初现 (第 8 周末)

- [ ] 所有基础组件迁移完成
- [ ] 页面组件基本完成
- [ ] 组件测试覆盖 >70%

### Milestone 6：功能完整 (第 9 周末)

- [ ] 所有 Services 迁移完成
- [ ] 路由配置完成
- [ ] 认证流程工作正常

### Milestone 7：项目发布就绪 (第 10 周末)

- [ ] E2E 测试通过
- [ ] 性能优化完成
- [ ] 文档完善
- [ ] 代码审查通过

---

## 📝 每天工作模板

### 标准工作日流程

```
09:00 - 09:30  日常站会
              - 昨天完成了什么
              - 今天计划
              - 有什么阻碍

09:30 - 12:00  深度工作时间 1 (2.5h)
              - 完成主要任务

12:00 - 13:00  午餐休息

13:00 - 15:30  深度工作时间 2 (2.5h)
              - 继续完成任务
              - 编写单元测试

15:30 - 16:00  代码审查和修复

16:00 - 17:00  文档和总结
              - 更新任务进度
              - 记录遇到的问题
              - 准备明日计划
```

---

## ✅ 检查清单

### 代码质量

- [ ] 类型检查通过 (`tsc --noEmit`)
- [ ] Linting 通过 (`eslint .`)
- [ ] 格式化通过 (`prettier --check .`)
- [ ] 单元测试通过 (`vitest run`)
- [ ] 集成测试通过
- [ ] E2E 测试通过 (`playwright test`)
- [ ] 代码覆盖率 >80%
- [ ] 没有 TODO 或 FIXME 注释

### 文档

- [ ] README 更新
- [ ] API 文档完成
- [ ] 组件使用文档
- [ ] 架构文档
- [ ] 部署文档

### 性能

- [ ] Bundle size <500KB (gzip)
- [ ] Lighthouse 分数 >90
- [ ] 首屏加载 <2s
- [ ] 交互延迟 <100ms

---

**创建日期**: 2024-11-09
**最后更新**: 2024-11-09
**维护者**: Frontend 迁移团队
