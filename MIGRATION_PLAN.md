# Penpot Frontend TypeScript 迁移详细计划

## 项目信息

- **项目名**: penpot-ts
- **构建工具**: RSBuild + TypeScript + React 19
- **项目架构**: Monorepo（pnpm workspaces）
- **前端框架**: React 19.2.0 + TypeScript 5.9.3
- **源项目**: Penpot (ClojureScript + Rumext)

---

## 📊 迁移概览

### 源项目结构分析

```
原始项目 (ClojureScript)
├── frontend/src/app/main/
│   ├── data/              # 状态管理 (24个文件)
│   ├── ui/                # UI 组件和页面
│   │   ├── auth/          # 认证模块
│   │   ├── dashboard/     # 仪表板
│   │   ├── workspace/     # 工作区
│   │   ├── viewer/        # 查看器
│   │   ├── settings/      # 设置
│   │   ├── ds/            # 设计系统
│   │   └── ...
│   ├── services/          # 业务逻辑
│   ├── utils/             # 工具函数
│   ├── constants/         # 常量
│   └── main.cljs          # 主入口
└── common/src/app/common/ # 共享代码
    ├── types/             # 类型定义
    ├── data/              # 共享数据
    ├── geom/              # 几何库
    ├── schema/            # 数据结构
    └── ...
```

### 新项目结构

```
penpot-ts/ (Monorepo)
├── packages/
│   ├── frontend/          # React + RSBuild
│   │   └── src/
│   │       ├── app/
│   │       │   ├── types/
│   │       │   ├── data/
│   │       │   ├── services/
│   │       │   ├── ui/
│   │       │   └── utils/
│   │       └── index.tsx
│   └── common/            # 共享库
│       └── src/
└── package.json
```

---

## 🚀 迁移阶段规划 (10周)

### 时间表概览

| 阶段     | 周数   | 目标                 | 完成度         |
| -------- | ------ | -------------------- | -------------- |
| 第一阶段 | 1-2周  | 基础架构和工具类迁移 | ▓░░░░░░░░░ 10% |
| 第二阶段 | 3-4周  | 类型系统和核心库迁移 | ▓░░░░░░░░░ 10% |
| 第三阶段 | 5-6周  | 状态管理层迁移       | ▓░░░░░░░░░ 10% |
| 第四阶段 | 7-8周  | UI 组件层迁移        | ▓░░░░░░░░░ 10% |
| 第五阶段 | 9-10周 | 集成和优化           | ▓░░░░░░░░░ 10% |

---

## 📝 第一阶段：基础架构和工具类迁移 (1-2周)

### 1.1 项目初始化和配置 (第1周)

#### 1.1.1 建立项目结构

**文件创建**:

```
packages/frontend/src/
├── types/
│   ├── index.ts               # 类型导出
│   ├── entities.ts            # 实体类型
│   ├── state.ts               # 状态类型
│   ├── api.ts                 # API 类型
│   └── common.ts              # 通用类型
├── store/                     # 状态管理层
│   ├── index.ts               # Store 配置
│   ├── middleware/            # 中间件
│   ├── slices/                # 状态分片
│   └── selectors/             # 选择器
├── services/                  # 业务逻辑层
│   ├── api/
│   │   └── client.ts          # HTTP 客户端
│   ├── auth.service.ts
│   └── ...
├── components/                # UI 组件层
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── layout/
│   └── ...
├── pages/                     # 页面组件
│   ├── auth/
│   ├── dashboard/
│   ├── workspace/
│   └── ...
├── hooks/                     # 自定义 Hooks
│   ├── useAuth.ts
│   ├── useWorkspace.ts
│   └── ...
├── utils/                     # 工具函数
│   ├── index.ts
│   ├── format.ts
│   ├── parse.ts
│   ├── math.ts
│   └── ...
├── lib/                       # 核心库
│   ├── geom/
│   ├── svg/
│   ├── data/
│   └── schema/
├── routes/                    # 路由配置
│   └── index.ts
├── constants/                 # 常量
│   ├── api.ts
│   ├── routes.ts
│   └── ...
├── theme/                     # 主题和样式
│   ├── index.ts
│   ├── light.ts
│   └── dark.ts
├── providers/                 # 应用提供者
│   └── AppProviders.tsx
├── App.tsx                    # 主组件
├── index.tsx                  # 应用入口
└── env.d.ts                   # 环境类型
```

**对应迁移**:

- ✅ 创建目录结构
- ✅ 配置 TSConfig（已完成）
- ✅ 配置 ESLint 规则
- ✅ 配置 RSBuild

#### 1.1.2 依赖安装和配置

**需要安装的核心依赖**:

```bash
# 状态管理
pnpm add zustand
pnpm add -D zustand

# HTTP 客户端
pnpm add axios

# 路由
pnpm add react-router-dom

# UI 库 (可选)
pnpm add @radix-ui/react-dialog
pnpm add @radix-ui/react-popover

# 工具
pnpm add lodash-es
pnpm add classnames
pnpm add uuid

# 开发工具
pnpm add -D @types/lodash-es
pnpm add -D @types/uuid
```

**对应迁移源**:

- 源项目中的 `deps.edn` 依赖分析

### 1.2 工具函数迁移 (第1-2周)

#### 1.2.1 数学和几何工具

**迁移文件清单**:

| 源文件                                     | 目标文件                            | 优先级 | 预计大小 |
| ------------------------------------------ | ----------------------------------- | ------ | -------- |
| `penpot/common/src/app/common/geom/*.cljs` | `packages/common/src/geom/`         | 🔴 高  | 3000行   |
| `penpot/common/src/app/common/math.cljs`   | `packages/common/src/math.ts`       | 🔴 高  | 500行    |
| `penpot/common/src/app/common/UUID.cljs`   | `packages/common/src/utils/uuid.ts` | 🔴 高  | 100行    |

**具体任务**:

```
  ├── 创建 packages/common/src/geom/point.ts
  ├── 转换数据结构 (Clojure Map → TypeScript Interface)
  ├── 转换函数 (defn → function)
  └── 编写单元测试

  ├── 创建 packages/common/src/geom/matrix.ts
  ├── 实现矩阵运算
  └── 编写单元测试

  ├── 创建 packages/common/src/geom/path.ts
  ├── 实现路径解析和变换
  └── 编写单元测试

Step 1.2.1.4: 迁移其他几何工具
  ├── transform.ts
  ├── bounds.ts
  └── intersection.ts
```

**关键转换规则**:

```typescript
// Clojure
(defn make-point [x y] {:x x :y y})
(defn point-add [p1 p2] {:x (+ (:x p1) (:x p2)) :y (+ (:y p1) (:y p2))})

// TypeScript
interface Point { x: number; y: number; }
const makePoint = (x: number, y: number): Point => ({ x, y });
const pointAdd = (p1: Point, p2: Point): Point => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
});
```

#### 1.2.2 字符串和格式化工具

**迁移文件清单**:

| 源文件                                           | 目标文件                                | 优先级 |
| ------------------------------------------------ | --------------------------------------- | ------ |
| `penpot/frontend/src/app/main/utils/format.cljs` | `packages/frontend/src/utils/format.ts` | 🟡 中  |
| `penpot/frontend/src/app/main/utils/parse.cljs`  | `packages/frontend/src/utils/parse.ts`  | 🟡 中  |
| `penpot/frontend/src/app/main/utils/string.cljs` | `packages/frontend/src/utils/string.ts` | 🟡 中  |

**具体任务**:

```
  ├── 创建 packages/frontend/src/utils/format.ts
  ├── 实现 formatNumber, formatDate, formatBytes 等
  └── 编写单元测试

  ├── 创建 packages/frontend/src/utils/parse.ts
  ├── 实现 parseDate, parseColor, parseNumber 等
  └── 编写单元测试
```

#### 1.2.3 DOM 操作工具

**迁移文件清单**:

| 源文件                                        | 目标文件                             | 优先级 |
| --------------------------------------------- | ------------------------------------ | ------ |
| `penpot/frontend/src/app/main/utils/dom.cljs` | `packages/frontend/src/utils/dom.ts` | 🟡 中  |

**具体任务**:

```
  ├── 创建 packages/frontend/src/utils/dom.ts
  ├── 实现 addClass, removeClass, hasClass, getPosition 等
  └── 编写单元测试
```

---

## 📝 第二阶段：类型系统和核心库迁移 (3-4周)

### 2.1 类型定义迁移 (第3周)

#### 2.1.1 共享类型迁移

**迁移文件清单**:

| 源文件                                            | 目标文件                               | 优先级 | 行数  |
| ------------------------------------------------- | -------------------------------------- | ------ | ----- |
| `penpot/common/src/app/common/types/shape/*.cljs` | `packages/frontend/src/types/shape.ts` | 🔴 高  | 1000+ |
| `penpot/common/src/app/common/types/fills/*.cljs` | `packages/frontend/src/types/fill.ts`  | 🔴 高  | 500+  |
| `penpot/common/src/app/common/types/path/*.cljs`  | `packages/frontend/src/types/path.ts`  | 🔴 高  | 300+  |

**具体任务**:

```
Step 2.1.1.1: 迁移形状类型
  ├── 创建 packages/frontend/src/types/shape.ts
  ├── 定义 Shape interface:
  │   ├── BaseShape
  │   ├── RectShape
  │   ├── CircleShape
  │   ├── TextShape
  │   ├── FrameShape
  │   ├── GroupShape
  │   ├── ImageShape
  │   └── PathShape
  ├── 定义属性类型:
  │   ├── Fill
  │   ├── Stroke
  │   ├── Shadow
  │   ├── BlendMode
  │   └── TypographyAttrs
  └── 编写类型守卫函数

Step 2.1.1.2: 迁移颜色和填充类型
  ├── 创建 packages/frontend/src/types/color.ts
  ├── 创建 packages/frontend/src/types/fill.ts
  └── 创建类型守卫函数

Step 2.1.1.3: 迁移路径类型
  ├── 创建 packages/frontend/src/types/path.ts
  ├── 定义 PathSegment, PathData 等
  └── 编写转换函数
```

**关键类型定义**:

```typescript
// Shape 类型树
interface BaseShape {
  id: string;
  name: string;
  type: ShapeType;
  parentId?: string;
  frameId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  fill?: Fill[];
  stroke?: Stroke[];
  shadow?: Shadow[];
}

type Shape =
  | (BaseShape & { type: 'RECT' })
  | (BaseShape & { type: 'CIRCLE' })
  | (BaseShape & { type: 'TEXT'; content: string })
  | (BaseShape & { type: 'FRAME'; children: Shape[] })
  | (BaseShape & { type: 'GROUP'; children: Shape[] })
  | (BaseShape & { type: 'IMAGE'; imageId: string })
  | (BaseShape & { type: 'PATH'; data: PathData });
```

#### 2.1.2 API 和状态类型

**迁移文件清单**:

| 源文件                                          | 目标文件                                | 优先级 |
| ----------------------------------------------- | --------------------------------------- | ------ |
| `penpot/frontend/src/app/main/data/auth.cljs`   | `packages/frontend/src/types/auth.ts`   | 🔴 高  |
| `penpot/frontend/src/app/main/data/common.cljs` | `packages/frontend/src/types/common.ts` | 🔴 高  |

**具体任务**:

```
Step 2.1.2.1: 迁移认证类型
  ├── 创建 packages/frontend/src/types/auth.ts
  ├── 定义 User, AuthState, LoginRequest 等
  └── 定义 API 请求/响应类型

Step 2.1.2.2: 迁移通用类型
  ├── 创建 packages/frontend/src/types/common.ts
  ├── 定义 Team, Project, File, Page 等
  └── 定义通用枚举和常量
```

### 2.2 核心库迁移 (第3-4周)

#### 2.2.1 数据结构库

**迁移文件清单**:

| 源文件                                     | 目标文件                          | 优先级 |
| ------------------------------------------ | --------------------------------- | ------ |
| `penpot/common/src/app/common/data/*.cljs` | `packages/frontend/src/lib/data/` | 🟡 中  |

**具体任务**:

```
Step 2.2.1.1: 迁移列表操作库
  ├── 创建 packages/frontend/src/lib/data/array.ts
  ├── 实现 insertAt, removeAt, replaceAt 等
  └── 编写单元测试

Step 2.2.1.2: 迁移对象操作库
  ├── 创建 packages/frontend/src/lib/data/object.ts
  ├── 实现 deepMerge, deepFreeze 等
  └── 编写单元测试

Step 2.2.1.3: 迁移集合库
  ├── 创建 packages/frontend/src/lib/data/set.ts
  ├── 实现集合操作
  └── 编写单元测试
```

#### 2.2.2 SVG 和路径库

**迁移文件清单**:

| 源文件                                         | 目标文件                                | 优先级 |
| ---------------------------------------------- | --------------------------------------- | ------ |
| `penpot/common/src/app/common/svg/*.cljs`      | `packages/frontend/src/lib/svg/`        | 🟡 中  |
| `penpot/common/src/app/common/svg/path/*.cljs` | `packages/frontend/src/lib/svg/path.ts` | 🟡 中  |

**具体任务**:

```
Step 2.2.2.1: 迁移 SVG 库
  ├── 创建 packages/frontend/src/lib/svg/index.ts
  ├── 实现 SVG 生成和解析
  └── 编写单元测试

Step 2.2.2.2: 迁移路径库
  ├── 创建 packages/frontend/src/lib/svg/path.ts
  ├── 实现 SVG Path 命令解析和生成
  └── 编写单元测试
```

---

## 📝 第三阶段：状态管理层迁移 (5-6周)

### 3.1 Store 和中间件配置 (第5周)

#### 3.1.1 建立 Zustand Store

**文件清单**:

- 创建 `packages/frontend/src/store/index.ts`
- 创建 `packages/frontend/src/store/middleware/`
  - `persistence.ts` - 持久化中间件
  - `logging.ts` - 日志中间件
  - `devtools.ts` - DevTools 中间件

**具体任务**:

```
Step 3.1.1.1: 建立基础 Store 结构
  ├── 创建 Store 工厂函数
  ├── 配置中间件
  └── 编写类型定义

Step 3.1.1.2: 实现持久化中间件
  ├── 实现状态持久化到 localStorage
  ├── 实现状态恢复
  └── 编写单元测试

Step 3.1.1.3: 实现日志中间件
  ├── 记录状态变化
  ├── 记录 action 调用
  └── 编写调试工具
```

**代码示例**:

```typescript
// packages/frontend/src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // 状态...
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // 状态和方法...
      }),
      { name: 'penpot-store' }
    )
  )
);
```

### 3.2 状态切片迁移 (第5-6周)

#### 3.2.1 核心状态模块

**迁移文件清单**:

| 源文件                                                 | 目标文件                                              | 优先级 | 行数 |
| ------------------------------------------------------ | ----------------------------------------------------- | ------ | ---- |
| `penpot/frontend/src/app/main/data/auth.cljs`          | `packages/frontend/src/store/slices/auth.ts`          | 🔴 高  | 300+ |
| `penpot/frontend/src/app/main/data/common.cljs`        | `packages/frontend/src/store/slices/common.ts`        | 🔴 高  | 500+ |
| `penpot/frontend/src/app/main/data/modal.cljs`         | `packages/frontend/src/store/slices/modal.ts`         | 🟡 中  | 100+ |
| `penpot/frontend/src/app/main/data/notifications.cljs` | `packages/frontend/src/store/slices/notifications.ts` | 🟡 中  | 200+ |

**具体任务**:

```
Step 3.2.1.1: 迁移认证状态
  ├── 创建 packages/frontend/src/store/slices/auth.ts
  ├── 实现状态:
  │   ├── user
  │   ├── token
  │   ├── isAuthenticated
  │   └── isLoading
  ├── 实现 actions:
  │   ├── login
  │   ├── logout
  │   ├── register
  │   └── refreshToken
  └── 编写单元测试

Step 3.2.1.2: 迁移通用状态
  ├── 创建 packages/frontend/src/store/slices/common.ts
  ├── 实现状态:
  │   ├── currentProject
  │   ├── currentFile
  │   ├── currentPage
  │   └── ...
  └── 编写单元测试

Step 3.2.1.3: 迁移 UI 状态
  ├── 创建 packages/frontend/src/store/slices/ui.ts
  ├── 实现状态:
  │   ├── theme
  │   ├── sidebarCollapsed
  │   ├── openedPanels
  │   └── ...
  └── 编写单元测试

Step 3.2.1.4: 迁移模态框状态
  ├── 创建 packages/frontend/src/store/slices/modal.ts
  ├── 实现栈式模态框管理
  └── 编写单元测试

Step 3.2.1.5: 迁移通知状态
  ├── 创建 packages/frontend/src/store/slices/notifications.ts
  ├── 实现通知列表管理
  └── 编写单元测试
```

#### 3.2.2 选择器和派生状态

**文件清单**:

- 创建 `packages/frontend/src/store/selectors/auth.ts`
- 创建 `packages/frontend/src/store/selectors/workspace.ts`
- 创建 `packages/frontend/src/store/selectors/ui.ts`

**具体任务**:

```
Step 3.2.2.1: 实现认证选择器
  ├── selectUser
  ├── selectIsAuthenticated
  ├── selectAuthLoading
  └── selectAuthError

Step 3.2.2.2: 实现工作区选择器
  ├── selectCurrentProject
  ├── selectCurrentFile
  ├── selectCurrentPage
  └── selectVisibleShapes

Step 3.2.2.3: 实现 UI 选择器
  ├── selectTheme
  ├── selectSidebarCollapsed
  └── selectOpenedPanels
```

---

## 📝 第四阶段：UI 组件层迁移 (7-8周)

### 4.1 基础组件和设计系统 (第7周)

#### 4.1.1 设计系统组件

**迁移文件清单**:

| 源目录                                            | 目标文件                                     | 优先级 | 组件数 |
| ------------------------------------------------- | -------------------------------------------- | ------ | ------ |
| `penpot/frontend/src/app/main/ui/ds/foundations/` | `packages/frontend/src/components/ds/`       | 🔴 高  | 5+     |
| `penpot/frontend/src/app/main/ui/ds/buttons/`     | `packages/frontend/src/components/buttons/`  | 🔴 高  | 10+    |
| `penpot/frontend/src/app/main/ui/ds/controls/`    | `packages/frontend/src/components/controls/` | 🔴 高  | 15+    |

**具体任务**:

```
Step 4.1.1.1: 迁移基础组件
  ├── 创建 Button.tsx
  ├── 创建 Input.tsx
  ├── 创建 Select.tsx
  ├── 创建 Checkbox.tsx
  ├── 创建 Radio.tsx
  ├── 创建 Label.tsx
  └── 编写 Storybook 文档

Step 4.1.1.2: 迁移对话框和弹出框
  ├── 创建 Dialog.tsx
  ├── 创建 Modal.tsx
  ├── 创建 Popover.tsx
  ├── 创建 Dropdown.tsx
  └── 编写 Storybook 文档

Step 4.1.1.3: 迁移表单组件
  ├── 创建 Form.tsx
  ├── 创建 FormField.tsx
  ├── 创建 FormGroup.tsx
  └── 编写文档

Step 4.1.1.4: 迁移通知组件
  ├── 创建 Notification.tsx
  ├── 创建 Toast.tsx
  ├── 创建 Alert.tsx
  └── 编写文档

Step 4.1.1.5: 迁移布局组件
  ├── 创建 Header.tsx
  ├── 创建 Sidebar.tsx
  ├── 创建 Panel.tsx
  ├── 创建 Tabs.tsx
  └── 编写文档
```

#### 4.1.2 主题和样式系统

**文件清单**:

- 创建 `packages/frontend/src/theme/index.ts`
- 创建 `packages/frontend/src/theme/light.ts`
- 创建 `packages/frontend/src/theme/dark.ts`
- 创建 `packages/frontend/src/styles/global.css`
- 创建 `packages/frontend/src/styles/variables.css`

**具体任务**:

```
Step 4.1.2.1: 建立主题系统
  ├── 定义颜色变量
  ├── 定义排版
  ├── 定义间距
  └── 定义动画

Step 4.1.2.2: 实现主题切换
  ├── 创建 useTheme Hook
  ├── 实现 ThemeProvider
  └── 实现主题持久化
```

### 4.2 页面模块迁移 (第7-8周)

#### 4.2.1 认证页面

**迁移文件清单**:

| 源文件                                               | 目标文件                                            | 优先级 |
| ---------------------------------------------------- | --------------------------------------------------- | ------ |
| `penpot/frontend/src/app/main/ui/auth/login.cljs`    | `packages/frontend/src/pages/auth/LoginPage.tsx`    | 🔴 高  |
| `penpot/frontend/src/app/main/ui/auth/register.cljs` | `packages/frontend/src/pages/auth/RegisterPage.tsx` | 🔴 高  |
| `penpot/frontend/src/app/main/ui/auth/recovery.cljs` | `packages/frontend/src/pages/auth/RecoveryPage.tsx` | 🔴 高  |

**具体任务**:

```
Step 4.2.1.1: 迁移登录页面
  ├── 创建 LoginPage.tsx
  ├── 实现登录表单
  ├── 集成认证 API
  ├── 集成状态管理
  └── 编写单元测试

Step 4.2.1.2: 迁移注册页面
  ├── 创建 RegisterPage.tsx
  ├── 实现注册表单
  ├── 实现表单验证
  ├── 集成认证 API
  └── 编写单元测试

Step 4.2.1.3: 迁移密码恢复页面
  ├── 创建 RecoveryPage.tsx
  ├── 实现恢复流程
  └── 编写单元测试
```

#### 4.2.2 仪表板页面

**迁移文件清单**:

| 源文件                                                     | 目标文件                                                  | 优先级 |
| ---------------------------------------------------------- | --------------------------------------------------------- | ------ |
| `penpot/frontend/src/app/main/ui/dashboard/dashboard.cljs` | `packages/frontend/src/pages/dashboard/DashboardPage.tsx` | 🔴 高  |
| `penpot/frontend/src/app/main/data/dashboard.cljs`         | `packages/frontend/src/store/slices/dashboard.ts`         | 🔴 高  |

**具体任务**:

```
Step 4.2.2.1: 迁移仪表板数据层
  ├── 创建 packages/frontend/src/store/slices/dashboard.ts
  ├── 实现状态:
  │   ├── projects
  │   ├── teams
  │   ├── recentFiles
  │   └── isLoading
  ├── 实现 actions:
  │   ├── fetchProjects
  │   ├── fetchTeams
  │   └── deleteProject
  └── 编写单元测试

Step 4.2.2.2: 迁移仪表板 UI
  ├── 创建 DashboardPage.tsx
  ├── 创建 ProjectsList.tsx
  ├── 创建 TeamsList.tsx
  ├── 创建 RecentFiles.tsx
  ├── 集成状态管理
  └── 编写单元测试

Step 4.2.2.3: 迁移仪表板对话框
  ├── 创建 CreateProjectDialog.tsx
  ├── 创建 DeleteProjectDialog.tsx
  └── 创建 ProjectDetailsDialog.tsx
```

#### 4.2.3 工作区页面（核心）

**迁移文件清单**:

| 源文件                                         | 目标文件                                        | 优先级 | 复杂度 |
| ---------------------------------------------- | ----------------------------------------------- | ------ | ------ |
| `penpot/frontend/src/app/main/data/workspace/` | `packages/frontend/src/store/slices/workspace/` | 🔴 高  | 🔴🔴🔴 |
| `penpot/frontend/src/app/main/ui/workspace/`   | `packages/frontend/src/pages/workspace/`        | 🔴 高  | 🔴🔴🔴 |

**具体任务**:

```
Step 4.2.3.1: 迁移工作区状态管理
  ├── 创建 packages/frontend/src/store/slices/workspace/index.ts
  ├── 创建 packages/frontend/src/store/slices/workspace/selection.ts
  ├── 创建 packages/frontend/src/store/slices/workspace/viewport.ts
  ├── 创建 packages/frontend/src/store/slices/workspace/history.ts
  ├── 创建 packages/frontend/src/store/slices/workspace/layers.ts
  └── 编写单元测试

Step 4.2.3.2: 迁移工作区主页面
  ├── 创建 WorkspacePage.tsx
  ├── 实现布局结构
  ├── 集成子组件
  └── 编写单元测试

Step 4.2.3.3: 迁移画布组件
  ├── 创建 Canvas.tsx
  ├── 实现画布渲染
  ├── 实现交互处理
  └── 编写单元测试

Step 4.2.3.4: 迁移工具栏
  ├── 创建 Toolbar.tsx
  ├── 实现工具选择
  ├── 实现快捷键
  └── 编写单元测试

Step 4.2.3.5: 迁移左侧面板（图层面板）
  ├── 创建 LayerPanel.tsx
  ├── 创建 LayerTree.tsx
  ├── 实现图层管理
  └── 编写单元测试

Step 4.2.3.6: 迁移右侧面板（属性面板）
  ├── 创建 PropertiesPanel.tsx
  ├── 创建 DesignPanel.tsx
  ├── 创建 PrototypePanel.tsx
  ├── 实现属性编辑
  └── 编写单元测试

Step 4.2.3.7: 迁移颜色选择器
  ├── 创建 ColorPicker.tsx
  ├── 实现颜色选择
  ├── 实现渐变编辑
  └── 编写单元测试

Step 4.2.3.8: 迁移其他工作区组件
  ├── 迁移文本编辑器
  ├── 迁移约束编辑器
  ├── 迁移路径编辑器
  └── 编写单元测试
```

#### 4.2.4 其他页面

**迁移文件清单**:

| 源文件                               | 目标文件                              | 优先级 |
| ------------------------------------ | ------------------------------------- | ------ |
| `frontend/src/app/main/ui/viewer/`   | `frontend/src/app/ui/pages/viewer/`   | 🟡 中  |
| `frontend/src/app/main/ui/settings/` | `frontend/src/app/ui/pages/settings/` | 🟡 中  |
| `frontend/src/app/main/ui/inspect/`  | `frontend/src/app/ui/pages/inspect/`  | 🟡 中  |

**具体任务**:

```
Step 4.2.4.1: 迁移查看器页面
  ├── 创建 ViewerPage.tsx
  └── 编写单元测试

Step 4.2.4.2: 迁移设置页面
  ├── 创建 SettingsPage.tsx
  ├── 创建 ProfileSettings.tsx
  ├── 创建 PreferencesSettings.tsx
  └── 编写单元测试

Step 4.2.4.3: 迁移检查面板
  ├── 创建 InspectPanel.tsx
  └── 编写单元测试
```

### 4.3 自定义 Hooks (第8周)

**创建文件清单**:

| Hook 名称       | 文件                                           | 优先级 |
| --------------- | ---------------------------------------------- | ------ |
| useAuth         | `frontend/src/app/ui/hooks/useAuth.ts`         | 🔴 高  |
| useWorkspace    | `frontend/src/app/ui/hooks/useWorkspace.ts`    | 🔴 高  |
| useSelection    | `frontend/src/app/ui/hooks/useSelection.ts`    | 🔴 高  |
| useCanvas       | `frontend/src/app/ui/hooks/useCanvas.ts`       | 🔴 高  |
| useModal        | `frontend/src/app/ui/hooks/useModal.ts`        | 🟡 中  |
| useTheme        | `frontend/src/app/ui/hooks/useTheme.ts`        | 🟡 中  |
| useLocalStorage | `frontend/src/app/ui/hooks/useLocalStorage.ts` | 🟡 中  |
| useAsync        | `frontend/src/app/ui/hooks/useAsync.ts`        | 🟡 中  |
| usePrevious     | `frontend/src/app/ui/hooks/usePrevious.ts`     | 🟢 低  |
| useClickOutside | `frontend/src/app/ui/hooks/useClickOutside.ts` | 🟢 低  |

**具体任务**:

```
Step 4.3.1: 实现核心 Hooks
  ├── useAuth - 认证状态和操作
  ├── useWorkspace - 工作区状态
  ├── useSelection - 选择管理
  ├── useCanvas - 画布控制
  └── 编写单元测试

Step 4.3.2: 实现工具 Hooks
  ├── useModal - 模态框管理
  ├── useTheme - 主题切换
  ├── useLocalStorage - 本地存储
  ├── useAsync - 异步操作
  └── 编写单元测试
```

---

## 📝 第五阶段：集成和优化 (9-10周)

### 5.1 路由和应用集成 (第9周)

#### 5.1.1 建立路由系统

**文件清单**:

- 创建 `packages/frontend/src/routes/index.ts`
- 创建 `packages/frontend/src/routes/Router.tsx`
- 创建 `packages/frontend/src/routes/PrivateRoute.tsx`

**具体任务**:

```
Step 5.1.1.1: 实现路由配置
  ├── 定义路由表
  ├── 实现公开路由
  ├── 实现私有路由
  └── 实现路由保护

Step 5.1.1.2: 实现页面导航
  ├── 创建 PrivateRoute 组件
  ├── 实现重定向逻辑
  ├── 实现 NotFound 页面
  └── 编写单元测试
```

#### 5.1.2 应用主组件

**文件清单**:

- 更新 `packages/frontend/src/App.tsx`
- 创建 `packages/frontend/src/providers/AppProviders.tsx`

**具体任务**:

```
Step 5.1.2.1: 实现应用 Provider
  ├── 实现 Store Provider
  ├── 实现 Router Provider
  ├── 实现 Theme Provider
  └── 实现 Query Provider (可选)

Step 5.1.2.2: 实现应用主组件
  ├── 集成 Store
  ├── 集成 Router
  ├── 实现错误边界
  └── 实现加载状态
```

### 5.2 Service 层完整性 (第9周)

#### 5.2.1 API 客户端迁移

**迁移文件清单**:

| 源文件                                   | 目标文件                                       | 优先级 |
| ---------------------------------------- | ---------------------------------------------- | ------ |
| `penpot/frontend/src/app/main/repo.cljs` | `packages/frontend/src/services/api/client.ts` | 🔴 高  |

**具体任务**:

```
Step 5.2.1.1: 实现 HTTP 客户端
  ├── 创建 packages/frontend/src/services/api/client.ts
  ├── 配置 axios 实例
  ├── 实现请求/响应拦截器
  ├── 实现错误处理
  └── 编写单元测试

Step 5.2.1.2: 实现 API Services
  ├── 创建 packages/frontend/src/services/auth.service.ts
  ├── 创建 packages/frontend/src/services/project.service.ts
  ├── 创建 packages/frontend/src/services/file.service.ts
  ├── 创建 packages/frontend/src/services/workspace.service.ts
  └── 编写单元测试
```

#### 5.2.2 WebSocket 集成（可选）

**文件清单**:

- 创建 `packages/frontend/src/services/websocket.service.ts`
- 创建 `packages/frontend/src/services/collaboration.service.ts`

**具体任务**:

```
Step 5.2.2.1: 实现 WebSocket 服务
  ├── 创建 WebSocket 连接管理
  ├── 实现消息处理
  ├── 实现自动重连
  └── 编写单元测试

Step 5.2.2.2: 实现协作功能
  ├── 实现实时编辑同步
  ├── 实现光标位置同步
  └── 编写单元测试
```

### 5.3 测试和文档 (第9-10周)

#### 5.3.1 单元测试

**测试覆盖率目标**: ≥ 80%

**测试文件清单**:

```
test/
├── unit/
│   ├── utils/
│   │   ├── geom.test.ts
│   │   ├── format.test.ts
│   │   └── ...
│   ├── types/
│   │   └── ...
│   ├── data/
│   │   ├── auth.test.ts
│   │   ├── workspace.test.ts
│   │   └── ...
│   ├── services/
│   │   ├── auth.service.test.ts
│   │   └── ...
│   └── ui/hooks/
│       ├── useAuth.test.ts
│       └── ...
├── integration/
│   ├── auth-flow.test.ts
│   ├── workspace-flow.test.ts
│   └── ...
└── e2e/
    ├── login.spec.ts
    ├── dashboard.spec.ts
    └── workspace.spec.ts
```

**具体任务**:

```
Step 5.3.1.1: 编写单元测试
  ├── 测试工具函数 (geom, format 等)
  ├── 测试类型检查函数
  ├── 测试 Store slices
  ├── 测试 Hooks
  └── 测试 Services

Step 5.3.1.2: 编写集成测试
  ├── 测试认证流程
  ├── 测试工作区流程
  └── 测试数据持久化

Step 5.3.1.3: 编写 E2E 测试
  ├── 测试完整登录流程
  ├── 测试仪表板操作
  └── 测试工作区操作
```

#### 5.3.2 文档编写

**文档清单**:

- 创建 `frontend/ARCHITECTURE.md` - 架构文档
- 创建 `frontend/DEVELOPMENT.md` - 开发指南
- 创建 `frontend/COMPONENTS.md` - 组件文档
- 创建 `frontend/API.md` - API 文档
- 创建 `frontend/TESTING.md` - 测试指南

**具体任务**:

```
Step 5.3.2.1: 编写架构文档
  ├── 项目结构说明
  ├── 数据流图
  ├── 模块关系图
  └── 集成指南

Step 5.3.2.2: 编写组件文档
  ├── 组件清单
  ├── 组件 API
  ├── 使用示例
  └── 最佳实践

Step 5.3.2.3: 编写开发指南
  ├── 开发环境搭建
  ├── 常见任务
  ├── 调试指南
  └── 贡献指南
```

### 5.4 性能优化和部署 (第10周)

#### 5.4.1 性能优化

**优化任务**:

```
Step 5.4.1.1: 代码分割
  ├── 路由级代码分割
  ├── 组件懒加载
  └── 动态导入

Step 5.4.1.2: 渲染优化
  ├── React.memo 使用
  ├── useCallback 优化
  ├── useMemo 优化
  └── 虚拟列表实现

Step 5.4.1.3: 打包优化
  ├── 分析包大小
  ├── 移除不必要依赖
  ├── 启用 tree-shaking
  └── 启用压缩
```

#### 5.4.2 部署准备

**文件清单**:

- 创建 `.env.example`
- 创建 `docker/Dockerfile`
- 创建 `deploy.sh` 脚本

**具体任务**:

```
Step 5.4.2.1: 环境配置
  ├── 创建环境变量文件
  ├── 配置构建环境
  ├── 配置生产环境
  └── 配置 API 端点

Step 5.4.2.2: 构建和部署
  ├── 测试生产构建
  ├── 创建 Docker 镜像
  ├── 配置 CI/CD
  └── 部署脚本
```

---

## 📊 迁移进度追踪

### 文件迁移统计

| 类别     | 预计文件数 | 优先级高 | 优先级中 | 已完成 | 进度          |
| -------- | ---------- | -------- | -------- | ------ | ------------- |
| 工具函数 | 20+        | 15       | 5        | 4      | ▓▓▓░░░░░░ 25% |
| 类型定义 | 10+        | 8        | 2        | 1      | ▓░░░░░░░░ 12% |
| 核心库   | 15+        | 10       | 5        | 3      | ▓▓░░░░░░░ 20% |
| 状态管理 | 15+        | 10       | 5        | 0      | ░░░░░░░░░ 0%  |
| 组件     | 50+        | 30       | 20       | 0      | ░░░░░░░░░ 0%  |
| 页面     | 10+        | 8        | 2        | 0      | ░░░░░░░░░ 0%  |
| 服务     | 10+        | 8        | 2        | 0      | ░░░░░░░░░ 0%  |
| 测试     | 100+       | 50       | 50       | 0      | ░░░░░░░░░ 0%  |
| **总计** | **240+**   | **139**  | **101**  | **8**  | ▓░░░░░░░░ 15% |

### ✅ 已完成工作详细记录 (截至 2025年11月10日)

#### 🏗️ 项目基础设施

- ✅ **项目架构搭建** - Monorepo 结构，pnpm workspaces 配置
- ✅ **构建工具配置** - RSBuild 1.6.3 + TypeScript 5.9.3 + ESLint
- ✅ **开发环境设置** - VS Code 工作区，调试配置，开发服务器
- ✅ **代码质量工具** - ESLint + Prettier + Husky pre-commit hooks

#### 📚 核心库迁移

- ✅ **数学库 (math.ts)** - 304行代码，完整数学工具函数集合
  - 三角函数、角度转换、数值处理、插值算法等
  - 文件：`packages/common/src/math.ts`
- ✅ **Point 几何库** - 598行代码，完整的 Point 类实现
  - 支持多种构造方式，点运算，变换，距离计算等
  - 文件：`packages/common/src/geom/point.ts`

- ✅ **Matrix 几何库** - 435行代码，完整的 Matrix 类实现
  - 矩阵运算、变换、组合、解析等核心功能
  - 文件：`packages/common/src/geom/matrix.ts`

#### 🔧 工具函数

- ✅ **类型工具函数** - 类型检查和验证工具
  - `isValidObject`, `isSafeNumber`, `isSafeInteger`, `isNonEmptyString`
  - 文件：`packages/common/src/utils/type.ts`

#### 📖 文档和规划

- ✅ **迁移规划文档** - 96.8KB 完整规划文档集合
  - 包含 MIGRATION_PLAN.md, FILE_MAPPING.md, WEEKLY_TASKS.md 等

### 完成度检查表

#### 第一阶段 (1-2周) - 🟢 部分完成

- [x] 目录结构已创建 ✅
- [x] 依赖已安装 ✅
- [x] TSConfig 已配置 ✅
- [x] ESLint 已配置 ✅
- [x] RSBuild 已配置 ✅
- [x] 数学工具函数已迁移 (math.ts) ✅
- [x] Point 几何库已迁移 (point.ts) ✅
- [x] Matrix 几何库已迁移 (matrix.ts) ✅
- [x] 类型工具函数已迁移 (type.ts) ✅
- [ ] 其他工具函数迁移 (format, dom, string, uuid)
- [ ] 单元测试已编写

#### 第二阶段 (3-4周)

- [ ] 类型系统已完成
- [ ] Shape 类型已定义
- [ ] API 类型已定义
- [ ] 核心库已迁移 (data, svg, path)
- [ ] 单元测试已编写

#### 第三阶段 (5-6周)

- [ ] Store 已建立
- [ ] 中间件已实现
- [ ] 认证状态已迁移
- [ ] 通用状态已迁移
- [ ] UI 状态已迁移
- [ ] 选择器已实现
- [ ] 单元测试已编写

#### 第四阶段 (7-8周)

- [ ] 基础组件已迁移 (Button, Input, etc.)
- [ ] 认证页面已迁移
- [ ] 仪表板页面已迁移
- [ ] 工作区页面已迁移 (核心)
- [ ] 其他页面已迁移
- [ ] Hooks 已实现
- [ ] 单元测试已编写

#### 第五阶段 (9-10周)

- [ ] 路由已实现
- [ ] 应用集成已完成
- [ ] API Services 已迁移
- [ ] WebSocket 已实现 (可选)
- [ ] 单元测试已编写
- [ ] 集成测试已编写
- [ ] E2E 测试已编写
- [ ] 文档已完成
- [ ] 性能优化已完成
- [ ] 部署准备已完成

---

## 🎯 关键决策和注意事项

### 1. 状态管理选择

**决定**: 使用 Zustand
**原因**:

- 轻量级和高性能
- TypeScript 支持好
- 学习曲线平缓
- 支持中间件

### 2. HTTP 客户端

**决定**: 使用 Axios
**原因**:

- 功能完整
- 拦截器支持
- TypeScript 支持好
- 社区大

### 3. 路由库

**决定**: 使用 React Router v6
**原因**:

- 标准库
- TypeScript 支持好
- 功能完整
- 社区大

### 4. UI 组件库

**决定**: 优先迁移现有设计系统，必要时使用 Radix UI
**原因**:

- 保持设计一致性
- Radix UI 作为补充（低级组件）
- 更好的控制和定制化

### 5. 样式方案

**决定**: CSS Modules + 全局 CSS
**原因**:

- 避免样式冲突
- 利用 RSBuild 的原生支持
- 性能好

### 6. 测试框架

**决定**: Vitest + React Testing Library + Playwright
**原因**:

- Vitest: 快速、ESM 支持
- RTL: 测试最佳实践
- Playwright: 可靠的 E2E 测试

---

## 🚀 快速开始命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev:frontend

# 构建生产版本
pnpm build:frontend

# 运行测试
pnpm test

# 代码检查
pnpm lint
pnpm lint:fix
```

---

## 📚 相关文档

- 原始规划文档: `/Users/sanfengliao/workspace/penpot/FRONTEND_TS_MIGRATION_PLAN.md`
- 架构详解文档: `/Users/sanfengliao/workspace/penpot/FRONTEND_TS_ARCHITECTURE.md`
- 学习指南: `/Users/sanfengliao/workspace/penpot/FRONTEND_TS_LEARNING_GUIDE.md`

---

## 📝 更新日志

**版本 1.0** (2024-11-09)

- ✅ 初始创建详细迁移计划
- ✅ 5 个阶段划分
- ✅ 240+ 文件迁移清单
- ✅ 详细任务分解

---

**创建日期**: 2024-11-09
**维护者**: Frontend 迁移团队
**项目路径**: `/Users/sanfengliao/workspace/penpot-ts`
