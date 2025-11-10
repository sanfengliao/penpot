# Copilot Instructions for Penpot Frontend TypeScript Migration

## 📋 Project Overview

This is a **Penpot Frontend Migration Project** from ClojureScript to TypeScript + React 19 + RSBuild.

🔥 **开始任何工作前，必须先查看 MIGRATION_PROGRESS.md 了解当前进度！**

- **Project Name**: penpot-ts
- **Location**: `/Users/sanfengliao/workspace/penpot-ts`
- **Current Progress**: **15%** (核心几何库已完成)
- **Duration**: 10 weeks
- **Scope**: 260+ files, 57,500+ lines of code
- **Tech Stack**: React 19.2.0 + TypeScript 5.9.3 + RSBuild 1.6.3 + Zustand
- **Source Project**: `/Users/sanfengliao/workspace/penpot` (ClojureScript)

## 🎯 Current Phase & Status

⚠️ **重要提醒**: 查看 MIGRATION_PROGRESS.md 了解最新进度状态！

```
✅ Phase 1 (Week 1-2): Utility Functions & Geom Library [60% 完成]
   ├── ✅ math.ts (304行) - 数学工具函数
   ├── ✅ geom/point.ts (598行) - Point 类和操作
   ├── ✅ geom/matrix.ts (435行) - Matrix 类和变换
   ├── ✅ utils/type.ts - 类型检查工具
   └── ⏳ 其他工具函数 (format, string, dom, uuid)

⏳ Phase 2 (Week 3-4): Type System [5% 完成]
⏳ Phase 3 (Week 5-6): State Management (Zustand) [0% 完成]
⏳ Phase 4 (Week 7-8): UI Components & Pages [0% 完成]
⏳ Phase 5 (Week 9-10): Services & Optimization [0% 完成]

总体进度: 15% (8个基础设施 + 4个核心库 / 54个主要模块)
```

## 📂 Project Structure

### Current Directory Layout

```
penpot-ts/ (Monorepo)
├── packages/
│   ├── frontend/                      # Frontend application (React + RSBuild)
│   │   ├── src/
│   │   │   ├── App.tsx                # Main App component
│   │   │   ├── App.css                # App styles
│   │   │   ├── index.tsx              # React root entry
│   │   │   └── env.d.ts               # Environment types
│   │   ├── public/                    # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── rsbuild.config.ts
│   │   └── README.md
│   │
│   ├── common/                        # Shared library package
│   │   ├── src/
│   │   │   ├── geom/                  # Geometric calculations
│   │   │   │   ├── point.ts           # Point types & functions
│   │   │   │   └── matrix.ts          # Matrix operations
│   │   │   ├── math.ts                # Math utilities
│   │   │   ├── utils/                 # Shared utilities
│   │   │   │   └── type.ts            # Utility types
│   │   │   └── index.ts               # Barrel exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── [other packages]
│
├── penpot/                            # Source project (for reference)
│   ├── frontend/                      # Original ClojureScript frontend
│   ├── common/                        # Original common library
│   └── ...
│
└── Root Configuration Files
    ├── package.json                   # Root package.json
    ├── pnpm-workspace.yaml            # Workspace config
    ├── tsconfig.json                  # Root TypeScript config
    ├── eslint.config.mjs
    └── Documentation
        ├── MIGRATION_PLAN.md          # 10-week migration plan
        ├── FILE_MAPPING.md            # 260+ file mappings
        ├── WEEKLY_TASKS.md            # Weekly task breakdown
        ├── QUICK_START.md             # Quick start guide
        └── ...
```

### Target Monorepo Structure (To Be Created)

```
penpot-ts/ (Monorepo)
├── packages/
│   ├── common/                        # Shared library package ✅ Started
│   │   └── src/
│   │       ├── geom/                  # Geometric calculations ✅ (point.ts, matrix.ts)
│   │       │   ├── point.ts           ✅
│   │       │   ├── matrix.ts          ✅
│   │       │   ├── transform.ts       ⬜
│   │       │   ├── shapes/            ⬜
│   │       │   └── index.ts
│   │       ├── math/                  # Math utilities ✅
│   │       │   └── index.ts
│   │       ├── utils/                 # Utility types
│   │       │   ├── type.ts            ✅
│   │       │   └── index.ts
│   │       └── index.ts               # Barrel exports
│   │
│   ├── frontend/                      # Frontend application ✅ Started
│   │   └── src/
│   │       ├── components/            # Reusable components ⬜
│   │       │   ├── Button/
│   │       │   ├── Input/
│   │       │   ├── Select/
│   │       │   ├── Dialog/
│   │       │   └── ...
│   │       ├── pages/                 # Page components ⬜
│   │       │   ├── Auth/
│   │       │   ├── Dashboard/
│   │       │   ├── Workspace/
│   │       │   ├── Viewer/
│   │       │   └── ...
│   │       ├── hooks/                 # Custom hooks ⬜
│   │       ├── types/                 # Type definitions ⬜
│   │       │   ├── shape.ts
│   │       │   ├── auth.ts
│   │       │   ├── common.ts
│   │       │   ├── path.ts
│   │       │   ├── fill.ts
│   │       │   ├── api.ts
│   │       │   └── index.ts
│   │       ├── store/                 # State management (Zustand) ⬜
│   │       │   ├── index.ts
│   │       │   ├── slices/
│   │       │   │   ├── auth.ts
│   │       │   │   ├── common.ts
│   │       │   │   ├── modal.ts
│   │       │   │   ├── notifications.ts
│   │       │   │   ├── dashboard.ts
│   │       │   │   ├── workspace.ts
│   │       │   │   └── selection.ts
│   │       │   ├── selectors/
│   │       │   └── middleware/
│   │       ├── services/              # Business logic ⬜
│   │       │   ├── api/
│   │       │   │   └── client.ts
│   │       │   ├── auth.service.ts
│   │       │   ├── workspace.service.ts
│   │       │   ├── file.service.ts
│   │       │   └── index.ts
│   │       ├── utils/                 # Utility functions ⬜
│   │       │   ├── format.ts
│   │       │   ├── parse.ts
│   │       │   ├── dom.ts
│   │       │   ├── string.ts
│   │       │   ├── uuid.ts
│   │       │   └── index.ts
│   │       ├── routes/                # React Router config ⬜
│   │       │   ├── index.tsx
│   │       │   └── types.ts
│   │       ├── constants/             # Constants ⬜
│   │       │   ├── api.ts
│   │       │   ├── routes.ts
│   │       │   ├── storage.ts
│   │       │   └── index.ts
│   │       ├── styles/                # Global styles ⬜
│   │       ├── config/                # Configuration ⬜
│   │       │   ├── api.ts
│   │       │   ├── env.ts
│   │       │   └── index.ts
│   │       ├── App.tsx                ✅
│   │       ├── App.css                ✅
│   │       ├── index.tsx              ✅
│   │       └── env.d.ts               ✅
│   │
│   └── [other packages as needed]
```

### Monorepo Setup

**Workspace Structure** (`pnpm-workspace.yaml`):
```yaml
packages:
  - 'packages/*'
```

**Common Library Export** (`packages/common/src/index.ts`):
```typescript
// Geometrics
export * from './geom/point';
export * from './geom/matrix';

// Math
export * from './math';

// Utilities
export * from './utils/type';
```

**Frontend Import Path** (in `tsconfig.json`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@penpot-ts/common": ["../common/src"],
      "@penpot-ts/common/*": ["../common/src/*"]
    }
  }
}
```


## 🔄 Code Translation Rules

### ClojureScript to TypeScript - Key Patterns

#### 1. Data Structures - Maps to Interfaces
```clojure
;; Clojure Map
{:id "123" :name "Shape" :x 100 :y 200}
```
```typescript
// TypeScript Interface & Object
interface Shape {
  id: string;
  name: string;
  x: number;
  y: number;
}
const shape: Shape = { id: '123', name: 'Shape', x: 100, y: 200 };
```

#### 2. Functions - defn to const arrow functions
```clojure
;; Clojure
(defn make-point [x y] {:x x :y y})
(defn point-distance [p1 p2]
  (sqrt (+ (pow (- (:x p2) (:x p1)) 2)
           (pow (- (:y p2) (:y p1)) 2))))
```
```typescript
// TypeScript
interface Point { x: number; y: number; }
export const makePoint = (x: number, y: number): Point => ({ x, y });
export const pointDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
```

#### 3. Collections - Vectors/Lists to Arrays
```clojure
;; Clojure Vector
[1 2 3 4 5]
(map inc [1 2 3])
(filter even? [1 2 3 4])
```
```typescript
// TypeScript Array
[1, 2, 3, 4, 5]
[1, 2, 3].map(x => x + 1)
[1, 2, 3, 4].filter(x => x % 2 === 0)
```

#### 4. Booleans & Predicates
```clojure
;; Clojure
(if condition true-val false-val)
(when condition action)
(or-not condition)
(is-point? obj)
```
```typescript
// TypeScript
condition ? trueVal : falseVal
condition && action
!condition
const isPoint = (obj: unknown): obj is Point => obj && 'x' in obj && 'y' in obj;
```

#### 5. Immutable Updates - assoc to spread operator
```clojure
;; Clojure
(assoc point :x 100)
(merge obj1 obj2)
(update obj :count inc)
```
```typescript
// TypeScript
{ ...point, x: 100 }
{ ...obj1, ...obj2 }
{ ...obj, count: obj.count + 1 }
```

#### 6. 优先使用成员函数而非静态函数
在迁移过程中，**优先选择使用成员函数（类方法）而非静态函数**，这样更符合 TypeScript 的面向对象编程风格。

```clojure
;; Clojure - 函数式方法
(defn point-distance [p1 p2]
  (sqrt (+ (pow (- (:x p2) (:x p1)) 2)
           (pow (- (:y p2) (:y p1)) 2))))

(point-distance p1 p2)
```
```typescript
// ✅ 推荐：使用成员函数（类方法）
class Point {
  constructor(public x: number, public y: number) {}
  
  distance(other: Point): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

p1.distance(p2)

// ❌ 不推荐：仅使用静态函数
class Point {
  constructor(public x: number, public y: number) {}
  
  static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

Point.distance(p1, p2)
```

#### 7. 保留原始注释并适当扩展
在迁移代码时，**保留原始英文注释以便对比原实现**，同时**根据需要添加中文或补充注释**来增强可读性。

```clojure
;; Clojure - 原始注释
;; Calculate the distance between two points using euclidean formula
(defn point-distance [p1 p2]
  (sqrt (+ (pow (- (:x p2) (:x p1)) 2)
           (pow (- (:y p2) (:y p1)) 2))))
```
```typescript
// ✅ 推荐：保留原注释，同时添加补充说明
class Point {
  constructor(public x: number, public y: number) {}
  
  /**
   * Calculate the distance between two points using euclidean formula
   * 计算当前点与另一点之间的欧几里得距离
   */
  distance(other: Point): number {
    // dx² + dy² = distance²
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// ❌ 不推荐：删除原注释或只保留中文
distance(other: Point): number {
  // 计算距离
  const dx = other.x - this.x;
  const dy = other.y - this.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

**注释指南**：
- ✅ 保留所有原始英文注释和文档字符串
- ✅ 为复杂逻辑添加中文或英文解释
- ✅ 标记重要的数学公式或算法说明
- ✅ 解释类型转换或非直观的代码逻辑
- ❌ 不要删除原始注释
- ❌ 避免过度注释（不要注释显而易见的代码）

#### 🔥 8. **成员函数一一对应原则 - 绝不自己添加或删除函数**

在迁移过程中，**必须严格一一对应原 ClojureScript 代码中的函数**。绝不自己添加额外的便利方法或删除原有函数。

**规则**：
- ✅ **精确对应**: 原代码有什么函数，就实现什么函数 - 一个都不能少，也不能多
- ✅ **名称一致**: 尽量保持与原代码一致的函数名称（适应 camelCase 命名）
- ✅ **签名一致**: 参数数量和顺序保持一致
- ✅ **功能一致**: 实现完全相同的业务逻辑
- ❌ **不要添加**: 即使认为有帮助的便利方法或扩展函数也不要添加
- ❌ **不要删除**: 即使认为某些函数不常用也要保留
- ❌ **不要修改**: 不要改变函数的行为、返回值类型或参数数量

**示例**：

```clojure
;; Clojure - 原始代码
(defn point-distance [p1 p2] ...)
(defn point-add [p1 p2] ...)
(defn point-scale [p scale] ...)
```

```typescript
// ✅ 正确：一一对应
export class Point {
  static distance(p1: Point, p2: Point): number { ... }
  static add(p1: Point, p2: Point): Point { ... }
  static scale(p: Point, scale: number): Point { ... }
}

// ❌ 错误：自己添加了 midpoint、lerp 等便利函数
export class Point {
  static distance(p1: Point, p2: Point): number { ... }
  static add(p1: Point, p2: Point): Point { ... }
  static scale(p: Point, scale: number): Point { ... }
  
  // 不要添加这些！
  static midpoint(p1: Point, p2: Point): Point { ... }
  static lerp(p1: Point, p2: Point, t: number): Point { ... }
}

// ❌ 错误：删除了某些不常用的函数
export class Point {
  static distance(p1: Point, p2: Point): number { ... }
  static add(p1: Point, p2: Point): Point { ... }
  // 不要删除 scale！
}
```

**实施方式**：
1. 先完整阅读原 ClojureScript 代码，列出所有函数
2. 逐一实现每个函数，确保数量相符
3. 在迁移完成后，对比检查：函数数量和名称是否一致
4. 更新 `MIGRATION_PROGRESS.md` 时记录函数个数

## 📋 File Mapping Quick Reference

### Current Status - Existing Files

**packages/common/src/**:
- ✅ `geom/point.ts` - Point types and operations
- ✅ `geom/matrix.ts` - Matrix operations
- ✅ `math.ts` - Math utilities
- ✅ `utils/type.ts` - Utility types

**packages/frontend/src/**:
- ✅ `App.tsx` - Main App component
- ✅ `index.tsx` - React root entry
- ✅ `env.d.ts` - Environment types
- ✅ `App.css` - Styles

### Phase 1: Utility Functions (Week 1-2)

**To Be Created in `packages/common/src/`**:

| Priority | Item | Lines | Target Path | Status |
|----------|------|-------|------------|--------|
| 🔴 High | Geom - Transform | 150 | `geom/transform.ts` | ⬜ |
| 🔴 High | Geom - Shapes | 500+ | `geom/shapes/` | ⬜ |
| � Mid | Math - additional | 300+ | `math/` (expand) | ⬜ |
| 🟡 Mid | Data - Array ops | 200+ | `data/array.ts` | ⬜ |
| 🟡 Mid | Data - Object ops | 200+ | `data/object.ts` | ⬜ |



**To Be Created in `packages/frontend/src/`**:

| Priority | Item | Lines | Target Path | Status |
|----------|------|-------|------------|--------|
| 🔴 High | Utilities - Format | 200 | `utils/format.ts` | ⬜ |
| 🔴 High | Utilities - Parse | 150 | `utils/parse.ts` | ⬜ |
| 🟡 Mid | Utilities - String | 100 | `utils/string.ts` | ⬜ |
| 🟡 Mid | Utilities - DOM | 250 | `utils/dom.ts` | ⬜ |
| 🟡 Mid | Utilities - UUID | 50 | `utils/uuid.ts` | ⬜ |

### Phase 2: Type System (Week 3-4)

**To Be Created in `packages/frontend/src/types/`**:

| Priority | Type | Lines | Status |
|----------|------|-------|--------|
| 🔴 High | Shape types | 1000+ | ⬜ |
| 🔴 High | Fill/Color types | 500+ | ⬜ |
| 🔴 High | Path types | 300+ | ⬜ |
| 🟡 Mid | Auth types | 200+ | ⬜ |
| 🟡 Mid | API types | 300+ | ⬜ |

### Phase 3: State Management (Week 5-6)

**To Be Created in `packages/frontend/src/store/`**:

| Slice | Purpose | Lines | Status |
|-------|---------|-------|--------|
| auth | Authentication state | 300+ | ⬜ |
| common | Common app state | 400+ | ⬜ |
| modal | Modal dialogs state | 200+ | ⬜ |
| notifications | Toast notifications | 150+ | ⬜ |
| dashboard | Dashboard state | 300+ | ⬜ |
| workspace | Workspace state | 500+ | ⬜ |
| selection | Selection state | 200+ | ⬜ |

### Phase 4: UI Components (Week 7-8)

**To Be Created in `packages/frontend/src/`**:

| Category | Components | Count | Status |
|----------|-----------|-------|--------|
| components | Base UI (Button, Input, Select, etc.) | 15+ | ⬜ |
| components | Layout (Header, Sidebar, Grid) | 10+ | ⬜ |
| pages | Auth, Dashboard, Workspace, Viewer | 8+ | ⬜ |
| components | Dialogs (Modal, Dialog, Popover, Menu) | 12+ | ⬜ |


## ✅ Code Quality Requirements

### TypeScript Standards
- ✅ **Strict Mode**: All `tsconfig.json` strict options enabled
- ✅ **No `any` Types**: Use proper types instead of `any`
- ✅ **Type Guards**: Use type predicates for runtime checks
- ✅ **Interfaces**: Export interfaces for all public types
- ✅ **Generics**: Use generics for reusable components/functions

### Testing Requirements
- ✅ **Unit Tests**: Minimum 90% coverage for utility functions
- ✅ **Type Coverage**: 100% type coverage (no implicit `any`)
- ✅ **Test Framework**: Use Vitest for unit tests
- ✅ **React Testing**: Use React Testing Library for components

### Code Organization
- ✅ **Single Responsibility**: One file per class/interface
- ✅ **Barrel Exports**: Use `index.ts` for re-exports
- ✅ **Path Aliases**: Use `@/` prefix for imports
- ✅ **Consistent Naming**: Follow camelCase for variables/functions, PascalCase for types

### 🔥 ESLint & Linting - 优先级说明

**不用过分追求 ESLint 通过** - 迁移完成比完美代码格式更重要！

- ✅ **优先完成迁移工作** - 专注于功能正确性和类型安全
- ✅ **在提交代码时处理** - Git Hook（pre-commit）会自动处理 ESLint 修复
- ❌ **不要因为 ESLint 错误阻塞迁移进度**
- ❌ **不要花过多时间调整代码格式**

**工作流程**：
1. 编写代码并实现功能 → 优先保证类型安全和逻辑正确
2. 提交代码时 → Git Hook 自动运行 `eslint --fix`
3. 无需手动修复大多数格式问题 → 自动处理

**示例**：
```typescript
// ✅ 接受：不完美的格式，但功能正确且类型安全
export const complexFunction = (input: string):number | undefined => {
  if (input.length > 10) {
    return parseInt(input, 10)
  } else {
    return undefined
  }
}

// 提交时 Git Hook 会自动格式化为：
export const complexFunction = (
  input: string
): number | undefined => {
  if (input.length > 10) {
    return parseInt(input, 10);
  } else {
    return undefined;
  }
};
```

## 🚀 Working Guidelines

### When Writing New Code

🔥 **首要步骤：检查 MIGRATION_PROGRESS.md**
   - **避免重复工作**: 确认要创建的文件是否已经存在
   - **正确导入**: 使用已完成的库，如 `@penpot-ts/common/geom/point`, `@penpot-ts/common/math`
   - **了解依赖**: 查看已完成文件的功能范围和 API
   - **更新进度**: 完成工作后更新进度文档

1. **Reference Original Code**
   - Always check `/Users/sanfengliao/workspace/penpot/` for original implementation
   - Use FILE_MAPPING.md to find source locations
   - Understand the original logic before translating

2. **Type Everything**
   - Define interfaces for all data structures
   - Use type predicates for runtime checks
   - Export all public types from barrel files

3. **Write Tests Simultaneously**
   - Create tests alongside implementation
   - Aim for >90% coverage
   - Test edge cases and error scenarios

4. **Follow Code Style**
   ```typescript
   // ✅ Good: Arrow functions, clear types
   export const processShape = (shape: Shape): Shape => {
     return { ...shape, updated: true };
   };
   
   // ❌ Bad: No types, unclear variable names
   export function process(s: any) {
     return Object.assign(s, { updated: true });
   }
   ```

### When Migrating from ClojureScript

1. **Identify Core Logic**
   - Extract pure functions first
   - Identify data transformations
   - Note side effects and async operations

2. **Create TypeScript Types**
   - Map Clojure specs to TypeScript interfaces
   - Define union types for variants
   - Use discriminated unions for type safety

3. **Implement Function by Function**
   - Start with simple utility functions
   - Move to complex domain logic
   - Write tests for each function

4. **Verify Behavior**
   - Compare output with original
   - Test edge cases
   - Run tests against real data

## 📚 Key Documents

- **🎯 MIGRATION_PROGRESS.md**: **[最重要]** 实时进度跟踪和已完成工作清单
- **QUICK_START.md**: Quick start guide with immediate tasks
- **WEEKLY_TASKS.md**: Detailed weekly breakdown (10 weeks)
- **FILE_MAPPING.md**: Complete file mapping (260+ files)
- **MIGRATION_PLAN.md**: Full migration strategy and patterns

### 🔥 进度跟踪重要说明

**务必优先查看 MIGRATION_PROGRESS.md**:
- ✅ **了解当前完成状态**: 查看哪些库已迁移，哪些待完成
- ✅ **正确导入已完成的库**: 避免重复创建已存在的文件
- ✅ **了解代码结构**: 查看已完成文件的行数和功能范围
- ✅ **下一步计划**: 明确接下来要做的任务优先级

## 🔗 Important Paths

**Source Project** (Original ClojureScript):
```
/Users/sanfengliao/workspace/penpot/
├── frontend/src/app/main/         # Original frontend code
│   ├── data/                       # State management (24 files)
│   ├── ui/                         # UI components and pages
│   ├── services/                   # Business logic
│   ├── utils/                      # Utility functions
│   └── constants/                  # Constants
└── common/src/app/common/          # Shared code
    ├── types/                      # Type definitions
    ├── geom/                       # Geometric operations
    ├── math/                       # Math utilities
    └── ...
```

**Target Project** (TypeScript + React):
```
/Users/sanfengliao/workspace/penpot-ts/
├── packages/
│   ├── frontend/                   # New React app
│   │   └── src/
│   │       ├── app/                # Application code (to be created)
│   │       ├── App.tsx             # Main component
│   │       └── index.tsx           # Entry point
│   └── common/                     # Shared library
│       └── src/
│           ├── geom/               # Already started
│           ├── math/               # Already started
│           └── utils/              # Already started
└── ...
```

**Key Files to Reference**:
- 迁移计划: `/Users/sanfengliao/workspace/penpot-ts/MIGRATION_PLAN.md`
- 文件映射: `/Users/sanfengliao/workspace/penpot-ts/FILE_MAPPING.md`
- 周任务: `/Users/sanfengliao/workspace/penpot-ts/WEEKLY_TASKS.md`


## 📊 Migration Tracking

### Project Layout Notes

- **Monorepo Structure**: Using `pnpm workspaces` with two main packages:
  - `packages/common/` - Shared utilities (math, geom, types)
  - `packages/frontend/` - React application
  
- **Already Started**: 
  - ✅ Basic common library structure with geom and math
  - ✅ Basic React app with App component
  - ✅ TypeScript configuration
  
- **To Be Done**:
  - ⬜ Expand common library with more utilities and data operations
  - ⬜ Expand frontend app with `app/` directory structure
  - ⬜ Implement 260+ file migrations across 10 weeks

### Completed Phases
- [ ] Phase 1: Utility Functions (0%)
- [ ] Phase 2: Type System (0%)
- [ ] Phase 3: State Management (0%)
- [ ] Phase 4: UI Components (0%)
- [ ] Phase 5: Services & Optimization (0%)

### Total Progress
- **Files Migrated**: 0 / 260+
- **Lines Migrated**: 0 / 57,500+
- **Tests Written**: 0 / 76+
- **Estimated Time Used**: 0 / 107 hours

### Existing Code in Common Package
```
packages/common/src/
├── geom/
│   ├── point.ts        ✅ Already migrated
│   └── matrix.ts       ✅ Already migrated
├── math.ts             ✅ Already migrated
└── utils/
    └── type.ts         ✅ Already migrated
```

### Existing Code in Frontend Package
```
packages/frontend/src/
├── App.tsx             ✅ React component
├── App.css             ✅ Styles
├── index.tsx           ✅ Entry point
└── env.d.ts            ✅ Environment types
```


From anywhere in monorepo:
```json
// packages/frontend/tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@penpot-ts/common": ["../common/src"],
      "@penpot-ts/common/*": ["../common/src/*"],
      "@penpot-ts/frontend": ["src"],
      "@penpot-ts/frontend/*": ["src/*"]
    }
  }
}
```

### Package Names

```
@penpot-ts/common       # Shared library package
@penpot-ts/frontend     # Frontend application package
@penpot-ts/[name]       # Any future packages
```




## 💡 Helpful Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build project
pnpm build

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Type check
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format

# Find source file
grep -r "function-name" /Users/sanfengliao/workspace/penpot/frontend/src
```

## ⚠️ Common Pitfalls to Avoid

- ❌ Don't use `any` type - define proper interfaces
- ❌ Don't skip type definitions - be explicit
- ❌ Don't migrate without understanding original logic
- ❌ Don't forget to write tests
- ❌ Don't ignore compiler errors - fix them properly
- ❌ Don't mix ClojureScript and TypeScript patterns
- ❌ Don't use `as` for type assertions - use type guards
- ❌ Don't create circular dependencies

## ✨ Best Practices

- ✅ Use barrel exports (`index.ts`) for cleaner imports
- ✅ Keep functions pure and side-effect free
- ✅ Document complex algorithms with comments
- ✅ Use descriptive variable names (avoid single letters except i, j, k)
- ✅ Group related functions together
- ✅ Use type predicates for type narrowing
- ✅ Use immutable updates (spread operator)
- ✅ Keep components small and focused

## 🎯 Next Steps

**🔥 首先必须做的**:
1. **查看 MIGRATION_PROGRESS.md** (5 分钟) - 了解当前15%进度状态
2. **检查已完成的库** - Point, Matrix, Math 可直接使用

**然后继续迁移**:
3. Read **QUICK_START.md** (30 minutes)
4. Complete remaining **Week 2 tasks** (Transform, Format, String utils)
5. Begin **Phase 2: Type System** migration
6. **及时更新进度**: 每完成一个文件都要更新 MIGRATION_PROGRESS.md
7. Follow **WEEKLY_TASKS.md** for detailed task breakdown

---

**Last Updated**: 2025-11-10 (添加 MIGRATION_PROGRESS.md 进度跟踪)  
**Next Review**: After Phase 1 completion  
**Owner**: Penpot TypeScript Migration Team

## 🚨 重要提醒总结

1. **始终先查看 MIGRATION_PROGRESS.md** - 了解哪些库已完成
3. **避免重复创建文件** - 检查文件是否已存在
4. **及时更新进度** - 每完成一个模块都要更新文档
