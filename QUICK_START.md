# Penpot 前端迁移 - 快速开始指南

## 🚀 30 秒快速了解

**任务**: 将 Penpot 前端从 ClojureScript 迁移到 TypeScript + React + RSBuild

**时间**: 10 周

**规模**: 260+ 个文件，57,500+ 行代码

**文档**:
- 📋 `FILE_MAPPING.md` - 详细的源文件到目标文件的映射表
- 📅 `WEEKLY_TASKS.md` - 按周分解的任务清单
- 📍 `MIGRATION_PLAN.md` - 完整的 5 阶段迁移计划
- ⚡ 本文件 - 快速开始指南

---

## 📋 我需要做什么？

### 按顺序执行以下 5 个阶段：

```
第 1-2 周: 工具函数 (26 小时)
  ↓
第 3-4 周: 类型系统 (17 小时)
  ↓
第 5-6 周: 状态管理 (16 小时)
  ↓
第 7-8 周: UI 组件 (20 小时)
  ↓
第 9 周: Services (10 小时)
  ↓
第 10 周: 优化和完成 (10 小时)
```

---

## 🎯 立即开始 - 第 1 周任务

### 第 1 天：项目初始化 (2 小时)

#### 1️⃣ 创建项目结构
```bash
cd /Users/sanfengliao/workspace/penpot-ts/frontend

# 创建主要目录
mkdir -p src/app/{lib,utils,types,store,ui,services,routes,constants,config}
mkdir -p src/app/lib/{geom,svg,data}
mkdir -p src/app/store/{slices,selectors,middleware}
mkdir -p src/app/ui/{components,pages,hooks,forms,styles}
mkdir -p src/app/services/api

# 创建测试目录
mkdir -p test/{unit,integration,e2e}
mkdir -p test/unit/{utils,lib,store,hooks,services,components}
```

#### 2️⃣ 安装依赖
```bash
cd /Users/sanfengliao/workspace/penpot-ts

# 安装核心依赖
pnpm add zustand immer axios react-router-dom

# 安装 UI 库
pnpm add @radix-ui/react-primitive @radix-ui/react-dialog classnames

# 安装开发工具
pnpm add -D \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  prettier \
  vitest @vitest/ui \
  @testing-library/react @testing-library/jest-dom \
  jsdom @playwright/test
```

#### 3️⃣ 配置 TypeScript
编辑 `frontend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "test"]
}
```

#### 4️⃣ 配置 RSBuild
编辑 `frontend/rsbuild.config.ts`:
```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '@': './src',
    },
  },
  output: {
    sourceMap: {
      js: 'source-map',
    },
  },
});
```

**验收标准**:
- [ ] 所有目录已创建
- [ ] `pnpm install` 成功
- [ ] TypeScript 编译无错误
- [ ] `pnpm dev` 可以启动开发服务器

---

### 第 2-5 天：工具函数迁移 (16 小时)

#### 📝 文件创建清单

**`frontend/src/app/utils/`**:

- [ ] `format.ts` (200 行)
  ```typescript
  export function formatNumber(num: number, decimals = 2): string
  export function formatDate(date: Date | number, format = 'YYYY-MM-DD'): string
  export function formatBytes(bytes: number): string
  export function formatDuration(ms: number): string
  export function formatCurrency(value: number, currency = 'USD'): string
  export function formatPercent(value: number): string
  ```

- [ ] `parse.ts` (150 行)
  ```typescript
  export function parseDate(str: string): Date
  export function parseColor(str: string): { r: number; g: number; b: number; a?: number }
  export function parseNumber(str: string): number
  export function parseJSON<T = any>(str: string): T | null
  ```

- [ ] `string.ts` (100 行)
  ```typescript
  export function capitalize(str: string): string
  export function slugify(str: string): string
  export function camelCase(str: string): string
  export function pascalCase(str: string): string
  export function kebabCase(str: string): string
  export function truncate(str: string, length: number): string
  ```

- [ ] `dom.ts` (250 行)
  ```typescript
  export function addClass(el: Element, ...classes: string[]): void
  export function removeClass(el: Element, ...classes: string[]): void
  export function hasClass(el: Element, className: string): boolean
  export function toggleClass(el: Element, className: string): boolean
  export function getPosition(el: Element): { x: number; y: number }
  export function getSize(el: Element): { width: number; height: number }
  export function setStyle(el: Element, styles: Record<string, string>): void
  export function addEventListener(el: Element, event: string, handler: Function): void
  ```

- [ ] `uuid.ts` (50 行)
  ```typescript
  export function uuidv4(): string
  export function isUUID(str: string): boolean
  ```

- [ ] `index.ts` (50 行)
  ```typescript
  export * from './format';
  export * from './parse';
  export * from './string';
  export * from './dom';
  export * from './uuid';
  ```

#### 📚 源文件位置

从这些原始 ClojureScript 文件迁移：
```
/Users/sanfengliao/workspace/penpot/frontend/src/app/main/utils/
  ├── format.cljs
  ├── parse.cljs
  ├── dom.cljs
  ├── string.cljs
  └── ...

/Users/sanfengliao/workspace/penpot/common/src/app/common/
  ├── uuid.cljs
  └── math.cljs
```

#### 🧪 编写单元测试

创建 `test/unit/utils/`:
```
test/unit/utils/
├── format.test.ts (100 行)
├── parse.test.ts (80 行)
├── string.test.ts (60 行)
├── dom.test.ts (50 行)
└── uuid.test.ts (40 行)
```

**测试示例** (`test/unit/utils/format.test.ts`):
```typescript
import { describe, it, expect } from 'vitest';
import { formatNumber, formatBytes } from '@/utils/format';

describe('format utilities', () => {
  describe('formatNumber', () => {
    it('should format number to 2 decimal places by default', () => {
      expect(formatNumber(3.14159)).toBe('3.14');
    });

    it('should format number to custom decimal places', () => {
      expect(formatNumber(3.14159, 3)).toBe('3.142');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0.00');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(1024)).toBe('1.00 KB');
      expect(formatBytes(1024 * 1024)).toBe('1.00 MB');
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1.00 GB');
    });
  });
});
```

**运行测试**:
```bash
cd /Users/sanfengliao/workspace/penpot-ts
pnpm test test/unit/utils/
```

---

### 第 6 周：几何库迁移 (12 小时)

#### 📝 几何库文件创建清单

**`frontend/src/app/lib/geom/`**:

- [ ] `point.ts` (100 行)
  ```typescript
  export interface Point { x: number; y: number }
  export const makePoint = (x: number, y: number): Point => ({ x, y })
  export const pointDistance = (p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    return Math.sqrt(dx * dx + dy * dy)
  }
  // ... 更多函数
  ```

- [ ] `matrix.ts` (200 行)
  ```typescript
  export interface Matrix {
    a: number; b: number; c: number;
    d: number; e: number; f: number;
  }
  export const identityMatrix = (): Matrix => ({
    a: 1, b: 0, c: 0, d: 1, e: 0, f: 0
  })
  export const matrixMultiply = (m1: Matrix, m2: Matrix): Matrix => {
    // 矩阵乘法实现
  }
  // ... 更多函数
  ```

- [ ] `transform.ts` (150 行)
  ```typescript
  export const transformPoint = (matrix: Matrix, point: Point): Point => {
    // 用矩阵变换点
  }
  // ... 更多变换函数
  ```

- [ ] `shapes/` 子目录
  - `line.ts` (50 行)
  - `circle.ts` (80 行)
  - `rect.ts` (100 行)
  - `polygon.ts` (80 行)
  - `intersection.ts` (200 行)

**关键翻译示例**:

ClojureScript:
```clojure
(defn make-point [x y] {:x x :y y})
(defn point-distance [p1 p2]
  (let [dx (- (:x p2) (:x p1))
        dy (- (:y p2) (:y p1))]
    (sqrt (+ (pow dx 2) (pow dy 2)))))
```

TypeScript:
```typescript
export interface Point { x: number; y: number }

export const makePoint = (x: number, y: number): Point => ({ x, y })

export const pointDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}
```

---

## 📊 进度追踪

### 使用此检查清单追踪每天进度

```markdown
# 迁移进度

## 第 1 周
- [x] 第 1 天：项目初始化 (2h)
- [x] 第 2 天：依赖安装 (1.5h)
- [x] 第 3 天：工具配置 (1h)
- [ ] 第 4 天：Util 框架 (2h)
- [ ] 第 5 天：Format 迁移 (3h)

## 第 2 周
- [ ] 第 6-7 天：Parse/String (3h)
- [ ] 第 8 天：DOM 工具 (2h)
- [ ] 第 9 天：UUID (1h)
- [ ] 第 10 天：几何库-Point (3h)
```

---

## 🔗 关键文档链接

### 详细计划文档

1. **`MIGRATION_PLAN.md`** (12,000+ 行)
   - 完整的 5 阶段迁移计划
   - 每个阶段的详细任务分解
   - 代码转换规则和示例
   - 完成检查清单

2. **`FILE_MAPPING.md`** (8,000+ 行)
   - 源文件到目标文件的完整映射表
   - 优先级标记 (🔴 高、🟡 中、🟢 低)
   - 文件行数估计
   - 功能清单

3. **`WEEKLY_TASKS.md`** (5,000+ 行)
   - 按周详细分解的任务
   - 每个任务的时间估计
   - 验收标准
   - 里程碑定义

### 项目结构

```
/Users/sanfengliao/workspace/penpot-ts/
├── MIGRATION_PLAN.md      ← 完整计划
├── FILE_MAPPING.md        ← 文件映射
├── WEEKLY_TASKS.md        ← 周任务
├── QUICK_START.md         ← 本文件
├── package.json           ← 根 package.json
├── pnpm-workspace.yaml    ← 工作区配置
├── frontend/              ← 前端项目
│   ├── src/
│   ├── test/
│   ├── package.json
│   ├── tsconfig.json
│   ├── rsbuild.config.ts
│   └── vitest.config.ts
└── common/                ← 通用库
    ├── src/
    ├── test/
    └── package.json
```

---

## ❓ 常见问题

### Q: 我应该从哪里开始？
**A**: 按照 `WEEKLY_TASKS.md` 中的第 1 周任务顺序开始。首先完成项目初始化，然后开始迁移工具函数。

### Q: 如何找到原始代码？
**A**: 原始 ClojureScript 文件位于 `/Users/sanfengliao/workspace/penpot/` 中。具体位置在 `FILE_MAPPING.md` 的源文件列中。

### Q: 需要多少时间完成迁移？
**A**: 大约 10 周，分为 5 个阶段。具体时间取决于代码质量要求（测试覆盖率、优化等）。

### Q: 如何验证我的工作？
**A**: 每个阶段都有验收标准和测试要求。运行 `pnpm test` 来检查单元测试通过情况。

### Q: 我遇到了问题，怎么办？
**A**: 
1. 检查 `WEEKLY_TASKS.md` 中的对应阶段
2. 查看 `MIGRATION_PLAN.md` 中的代码示例
3. 查看 `FILE_MAPPING.md` 中的源文件位置
4. 参考原始 ClojureScript 代码进行对比

---

## 🚦 关键指标

### 成功标志

✅ **第 1 周末**:
- 项目结构完成
- 开发环境配置成功
- 第一个单元测试通过

✅ **第 2 周末**:
- 所有工具函数迁移完成
- 单元测试覆盖 >90%
- 代码审查通过

✅ **第 4 周末**:
- 类型系统完成
- Type Guards 实现完成

✅ **第 6 周末**:
- 状态管理完成
- Store 测试覆盖 >80%

✅ **第 8 周末**:
- UI 组件完成
- 页面功能实现

✅ **第 10 周末**:
- E2E 测试通过
- 项目发布就绪

---

## 📞 需要帮助？

查看这些文件获取更多信息：

1. **详细计划**：`MIGRATION_PLAN.md`
2. **文件映射**：`FILE_MAPPING.md`
3. **周任务**：`WEEKLY_TASKS.md`
4. **快速开始**：本文件

---

**最后更新**: 2024-11-09  
**项目位置**: `/Users/sanfengliao/workspace/penpot-ts`  
**预计完成**: 10 周后
