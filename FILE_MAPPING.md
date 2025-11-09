# Penpot Frontend 迁移 - 详细文件清单

## 📋 文件对应映射表

### 第一阶段：工具函数迁移 (第 1-2 周)

#### 1.1 几何和数学工具

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `common/src/app/common/geom/point.cljs` | 100 | point.ts | `frontend/src/app/lib/geom/point.ts` | ⬜ 未开始 |
| 🔴 高 | `common/src/app/common/geom/matrix.cljs` | 200 | matrix.ts | `frontend/src/app/lib/geom/matrix.ts` | ⬜ 未开始 |
| 🔴 高 | `common/src/app/common/geom/transform.cljs` | 150 | transform.ts | `frontend/src/app/lib/geom/transform.ts` | ⬜ 未开始 |
| 🔴 高 | `common/src/app/common/geom/shapes/*.cljs` | 500+ | shapes/ | `frontend/src/app/lib/geom/shapes/` | ⬜ 未开始 |
| 🟡 中 | `common/src/app/common/math.cljs` | 300 | math.ts | `frontend/src/app/lib/math.ts` | ⬜ 未开始 |

**任务清单**:
```
✓ 创建 frontend/src/app/lib/geom/ 目录
✓ 迁移 Point 接口和方法
✓ 迁移 Matrix 接口和方法  
✓ 迁移 Transform 接口和方法
✓ 迁移几何形状计算
✓ 编写单元测试
```

**代码示例 - 类型转换**:
```clojure
;; ClojureScript
(defn make-point [x y] {:x x :y y})
(defn point-x [p] (:x p))
(defn point-distance [p1 p2]
  (sqrt (+ (pow (- (:x p2) (:x p1)) 2)
           (pow (- (:y p2) (:y p1)) 2))))
```

```typescript
// TypeScript
export interface Point {
  x: number;
  y: number;
}

export const makePoint = (x: number, y: number): Point => ({ x, y });
export const pointX = (p: Point): number => p.x;
export const pointDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
```

#### 1.2 字符串和格式化工具

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `frontend/src/app/main/utils/format.cljs` | 200 | format.ts | `frontend/src/app/utils/format.ts` | ⬜ 未开始 |
| 🟡 中 | `frontend/src/app/main/utils/parse.cljs` | 150 | parse.ts | `frontend/src/app/utils/parse.ts` | ⬜ 未开始 |
| 🟡 中 | `frontend/src/app/main/utils/string.cljs` | 100 | string.ts | `frontend/src/app/utils/string.ts` | ⬜ 未开始 |

**核心函数**:
- formatNumber
- formatDate
- formatBytes
- formatDuration
- parseDate
- parseColor
- parseNumber
- slugify
- capitalize

#### 1.3 DOM 操作工具

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `frontend/src/app/main/utils/dom.cljs` | 250 | dom.ts | `frontend/src/app/utils/dom.ts` | ⬜ 未开始 |

**核心函数**:
- addClass
- removeClass
- hasClass
- toggleClass
- getPosition
- getSize
- setStyle
- removeStyle
- addEventListener
- removeEventListener

#### 1.4 UUID 和通用工具

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `common/src/app/common/uuid.cljs` | 50 | uuid.ts | `frontend/src/app/utils/uuid.ts` | ⬜ 未开始 |

---

### 第二阶段：类型系统迁移 (第 3-4 周)

#### 2.1 Shape 和几何类型

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `common/src/app/common/types/shape/*.cljs` | 1000+ | shape.ts | `frontend/src/app/types/shape.ts` | ⬜ 未开始 |
| 🔴 高 | `common/src/app/common/types/path/*.cljs` | 300 | path.ts | `frontend/src/app/types/path.ts` | ⬜ 未开始 |
| 🔴 高 | `common/src/app/common/types/fills/*.cljs` | 200 | fill.ts | `frontend/src/app/types/fill.ts` | ⬜ 未开始 |

**关键类型**:
```typescript
// Shape 类型
export interface BaseShape {
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
}

export type Shape = 
  | RectShape
  | CircleShape
  | FrameShape
  | GroupShape
  | TextShape
  | ImageShape
  | PathShape;

// Fill 类型
export interface Fill {
  type: FillType;
  color?: Color;
  opacity?: number;
  pattern?: Pattern;
}

// Path 类型
export interface PathData {
  segments: PathSegment[];
  closed: boolean;
}
```

#### 2.2 API 和认证类型

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/data/auth.cljs` | 300 | auth.ts | `frontend/src/app/types/auth.ts` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/data/common.cljs` | 400 | common.ts | `frontend/src/app/types/common.ts` | ⬜ 未开始 |

**关键类型**:
```typescript
// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Common Types
export interface Project {
  id: string;
  name: string;
  teamId: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface File {
  id: string;
  name: string;
  projectId: string;
  pages: Page[];
  version: number;
}

export interface Page {
  id: string;
  name: string;
  fileId: string;
  shapes: Shape[];
  order: number;
}
```

#### 2.3 Schema 和验证类型

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `common/src/app/common/schema/*.cljs` | 500 | schema.ts | `frontend/src/app/lib/schema.ts` | ⬜ 未开始 |

---

### 第三阶段：核心库迁移 (第 3-4 周)

#### 3.1 数据操作库

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `common/src/app/common/data/*.cljs` | 400 | data.ts | `frontend/src/app/lib/data/index.ts` | ⬜ 未开始 |

**核心函数**:
- insertAt
- removeAt
- replaceAt
- moveAt
- swapAt
- concat
- split
- merge
- deepMerge
- deepFreeze
- deepClone

#### 3.2 SVG 和路径库

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟡 中 | `common/src/app/common/svg/*.cljs` | 600 | svg.ts | `frontend/src/app/lib/svg/index.ts` | ⬜ 未开始 |
| 🟡 中 | `common/src/app/common/svg/path/*.cljs` | 300 | path.ts | `frontend/src/app/lib/svg/path.ts` | ⬜ 未开始 |

**核心功能**:
- SVG 路径解析和生成
- Path 命令转换
- 贝塞尔曲线计算
- 路径简化
- 路径分割

---

### 第四阶段：状态管理迁移 (第 5-6 周)

#### 4.1 Store 和中间件

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | N/A | N/A | store.ts | `frontend/src/app/store/index.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | persistence.ts | `frontend/src/app/store/middleware/persistence.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | logging.ts | `frontend/src/app/store/middleware/logging.ts` | ⬜ 未开始 |

#### 4.2 状态切片

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/data/auth.cljs` | 300 | auth.ts | `frontend/src/app/store/slices/auth.ts` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/data/common.cljs` | 400 | common.ts | `frontend/src/app/store/slices/common.ts` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/data/modal.cljs` | 100 | modal.ts | `frontend/src/app/store/slices/modal.ts` | ⬜ 未开始 |
| 🟡 中 | `frontend/src/app/main/data/notifications.cljs` | 200 | notifications.ts | `frontend/src/app/store/slices/notifications.ts` | ⬜ 未开始 |
| 🟡 中 | `frontend/src/app/main/data/dashboard.cljs` | 300 | dashboard.ts | `frontend/src/app/store/slices/dashboard.ts` | ⬜ 未开始 |

**关键状态片段详细清单**:

```
auth.ts:
  - login action
  - logout action
  - register action
  - refreshToken action
  - setUser action
  - setToken action
  - setError action
  - setIsLoading action

common.ts:
  - setCurrentProject action
  - setCurrentFile action
  - setCurrentPage action
  - updateProject action
  - updateFile action
  - updatePage action

modal.ts:
  - openModal action
  - closeModal action
  - closeAllModals action
  - getTopModal selector

notifications.ts:
  - addNotification action
  - removeNotification action
  - clearNotifications action

dashboard.ts:
  - fetchProjects action
  - fetchTeams action
  - createProject action
  - deleteProject action
  - updateProject action
  - setIsLoading action
```

#### 4.3 Selectors

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | N/A | N/A | auth.ts | `frontend/src/app/store/selectors/auth.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | common.ts | `frontend/src/app/store/selectors/common.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | workspace.ts | `frontend/src/app/store/selectors/workspace.ts` | ⬜ 未开始 |

---

### 第五阶段：UI 组件迁移 (第 7-8 周)

#### 5.1 基础组件

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/ui/ds/buttons/button.cljs` | 100 | Button.tsx | `frontend/src/app/ui/components/Button.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/ds/controls/input.cljs` | 80 | Input.tsx | `frontend/src/app/ui/components/Input.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/ds/controls/select.cljs` | 120 | Select.tsx | `frontend/src/app/ui/components/Select.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/ds/controls/checkbox.cljs` | 60 | Checkbox.tsx | `frontend/src/app/ui/components/Checkbox.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/ds/controls/radio.cljs` | 60 | Radio.tsx | `frontend/src/app/ui/components/Radio.tsx` | ⬜ 未开始 |

**表单组件**:
- TextInput
- TextArea
- Select
- Checkbox
- Radio
- Toggle
- Slider
- ColorPicker

**UI 组件**:
- Button (variations: primary, secondary, danger)
- Badge
- Tag
- Progress
- Spinner
- Skeleton
- Divider

#### 5.2 容器和对话框组件

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/ui/ds/layout/*.cljs` | 200 | layout/ | `frontend/src/app/ui/components/layout/` | ⬜ 未开始 |

**布局组件**:
- Flex
- Grid
- Stack (HStack, VStack)
- Box
- Container
- Header
- Sidebar
- Footer
- Panel

**对话框**:
- Dialog
- Modal
- Alert
- Confirm
- Toast
- Popover
- Dropdown

#### 5.3 页面组件

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/ui/auth/login.cljs` | 200 | LoginPage.tsx | `frontend/src/app/ui/pages/auth/LoginPage.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/auth/register.cljs` | 200 | RegisterPage.tsx | `frontend/src/app/ui/pages/auth/RegisterPage.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/dashboard/dashboard.cljs` | 300 | DashboardPage.tsx | `frontend/src/app/ui/pages/dashboard/DashboardPage.tsx` | ⬜ 未开始 |
| 🔴 高 | `frontend/src/app/main/ui/workspace/*.cljs` | 2000+ | Workspace/ | `frontend/src/app/ui/pages/workspace/` | ⬜ 未开始 |

**页面细节**:

```
auth/
  ├── LoginPage.tsx (200行)
  │   ├── LoginForm
  │   └── integration with useAuth hook
  ├── RegisterPage.tsx (200行)
  │   ├── RegisterForm
  │   └── validation
  ├── RecoveryPage.tsx (150行)
  │   ├── RecoveryForm
  │   └── reset flow
  └── VerifyPage.tsx (100行)

dashboard/
  ├── DashboardPage.tsx (300行)
  │   ├── ProjectsList component
  │   ├── TeamsList component
  │   ├── RecentFiles component
  │   └── integration with useDashboard hook
  ├── ProjectsList.tsx (150行)
  ├── TeamsList.tsx (150行)
  ├── RecentFiles.tsx (100行)
  └── dialogs/
      ├── CreateProjectDialog.tsx
      ├── DeleteProjectDialog.tsx
      └── ProjectDetailsDialog.tsx

workspace/
  ├── WorkspacePage.tsx (500行) - 主页面
  ├── Canvas.tsx (300行) - 画布
  ├── Toolbar.tsx (200行) - 工具栏
  ├── LayerPanel.tsx (400行) - 左侧图层面板
  │   ├── LayerTree.tsx
  │   ├── LayerItem.tsx
  │   └── LayerContext.tsx
  ├── PropertiesPanel.tsx (600行) - 右侧属性面板
  │   ├── DesignPanel.tsx
  │   ├── PropertiesPanel.tsx (继续)
  │   ├── InspectPanel.tsx
  │   └── PrototypePanel.tsx
  ├── ColorPicker.tsx (300行)
  ├── TextEditor.tsx (200行)
  ├── PathEditor.tsx (200行)
  └── interactions/
      ├── MouseHandler.tsx
      ├── KeyboardHandler.tsx
      └── SelectionHandler.tsx

viewer/
  ├── ViewerPage.tsx
  ├── ViewerCanvas.tsx
  ├── CommentPanel.tsx
  └── VersionHistory.tsx

settings/
  ├── SettingsPage.tsx
  ├── ProfileSettings.tsx
  ├── PreferencesSettings.tsx
  ├── SecuritySettings.tsx
  └── NotificationSettings.tsx
```

---

### 第六阶段：Service 层迁移 (第 9 周)

#### 6.1 API 客户端

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/repo.cljs` | 300 | client.ts | `frontend/src/app/services/api/client.ts` | ⬜ 未开始 |

**API 客户端详细**:
```typescript
// API 端点配置
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // Projects
  GET_PROJECTS: '/projects',
  CREATE_PROJECT: '/projects',
  UPDATE_PROJECT: '/projects/:id',
  DELETE_PROJECT: '/projects/:id',
  
  // Files
  GET_FILES: '/projects/:id/files',
  CREATE_FILE: '/projects/:id/files',
  UPDATE_FILE: '/files/:id',
  DELETE_FILE: '/files/:id',
  
  // Pages
  GET_PAGES: '/files/:id/pages',
  CREATE_PAGE: '/files/:id/pages',
  UPDATE_PAGE: '/pages/:id',
  DELETE_PAGE: '/pages/:id',
  
  // Shapes
  GET_SHAPES: '/pages/:id/shapes',
  CREATE_SHAPE: '/pages/:id/shapes',
  UPDATE_SHAPE: '/shapes/:id',
  DELETE_SHAPE: '/shapes/:id',
};
```

#### 6.2 Service 类

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | N/A | N/A | auth.ts | `frontend/src/app/services/auth.service.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | project.ts | `frontend/src/app/services/project.service.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | file.ts | `frontend/src/app/services/file.service.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | workspace.ts | `frontend/src/app/services/workspace.service.ts` | ⬜ 未开始 |

**Service 类方法清单**:

```typescript
// AuthService
export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse>;
  async logout(): Promise<void>;
  async register(data: RegisterRequest): Promise<User>;
  async verifyEmail(token: string): Promise<void>;
  async refreshToken(): Promise<RefreshTokenResponse>;
  async sendPasswordRecovery(email: string): Promise<void>;
  async resetPassword(token: string, password: string): Promise<void>;
}

// ProjectService
export class ProjectService {
  async getProjects(): Promise<Project[]>;
  async getProject(id: string): Promise<Project>;
  async createProject(data: CreateProjectRequest): Promise<Project>;
  async updateProject(id: string, data: UpdateProjectRequest): Promise<Project>;
  async deleteProject(id: string): Promise<void>;
  async shareProject(id: string, userId: string): Promise<void>;
  async unshareProject(id: string, userId: string): Promise<void>;
}

// FileService
export class FileService {
  async getFiles(projectId: string): Promise<File[]>;
  async getFile(id: string): Promise<File>;
  async createFile(projectId: string, data: CreateFileRequest): Promise<File>;
  async updateFile(id: string, data: UpdateFileRequest): Promise<File>;
  async deleteFile(id: string): Promise<void>;
  async duplicateFile(id: string, name: string): Promise<File>;
  async exportFile(id: string, format: ExportFormat): Promise<Blob>;
  async importFile(projectId: string, file: File): Promise<ImportResult>;
}

// WorkspaceService
export class WorkspaceService {
  async getPage(pageId: string): Promise<Page>;
  async getShapes(pageId: string): Promise<Shape[]>;
  async createShape(pageId: string, data: CreateShapeRequest): Promise<Shape>;
  async updateShape(id: string, data: UpdateShapeRequest): Promise<Shape>;
  async deleteShape(id: string): Promise<void>;
  async moveShape(id: string, targetId: string, index: number): Promise<void>;
  async saveChanges(fileId: string, changes: Change[]): Promise<SaveResponse>;
}
```

#### 6.3 WebSocket 服务 (可选)

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🟢 低 | N/A | N/A | websocket.ts | `frontend/src/app/services/websocket.service.ts` | ⬜ 未开始 |
| 🟢 低 | N/A | N/A | collaboration.ts | `frontend/src/app/services/collaboration.service.ts` | ⬜ 未开始 |

---

### 第七阶段：Hooks 迁移 (第 8 周)

| 优先级 | Hook 名称 | 源文件 | 目标文件 | 目标路径 | 行数 | 迁移状态 |
|------|---------|------|---------|---------|------|---------|
| 🔴 高 | useAuth | N/A | useAuth.ts | `frontend/src/app/ui/hooks/useAuth.ts` | 50 | ⬜ 未开始 |
| 🔴 高 | useWorkspace | N/A | useWorkspace.ts | `frontend/src/app/ui/hooks/useWorkspace.ts` | 80 | ⬜ 未开始 |
| 🔴 高 | useSelection | N/A | useSelection.ts | `frontend/src/app/ui/hooks/useSelection.ts` | 60 | ⬜ 未开始 |
| 🔴 高 | useCanvas | N/A | useCanvas.ts | `frontend/src/app/ui/hooks/useCanvas.ts` | 100 | ⬜ 未开始 |
| 🟡 中 | useModal | N/A | useModal.ts | `frontend/src/app/ui/hooks/useModal.ts` | 50 | ⬜ 未开始 |
| 🟡 中 | useTheme | N/A | useTheme.ts | `frontend/src/app/ui/hooks/useTheme.ts` | 40 | ⬜ 未开始 |
| 🟡 中 | useLocalStorage | N/A | useLocalStorage.ts | `frontend/src/app/ui/hooks/useLocalStorage.ts` | 40 | ⬜ 未开始 |
| 🟡 中 | useAsync | N/A | useAsync.ts | `frontend/src/app/ui/hooks/useAsync.ts` | 60 | ⬜ 未开始 |
| 🟢 低 | usePrevious | N/A | usePrevious.ts | `frontend/src/app/ui/hooks/usePrevious.ts` | 20 | ⬜ 未开始 |
| 🟢 低 | useClickOutside | N/A | useClickOutside.ts | `frontend/src/app/ui/hooks/useClickOutside.ts` | 35 | ⬜ 未开始 |

---

### 第八阶段：路由和集成 (第 9 周)

| 优先级 | 源文件 | 行数 | 目标文件 | 目标路径 | 迁移状态 |
|------|------|------|---------|---------|---------|
| 🔴 高 | `frontend/src/app/main/router.cljs` | 150 | routes.ts | `frontend/src/app/routes/index.ts` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | Router.tsx | `frontend/src/app/routes/Router.tsx` | ⬜ 未开始 |
| 🔴 高 | N/A | N/A | PrivateRoute.tsx | `frontend/src/app/routes/PrivateRoute.tsx` | ⬜ 未开始 |

**路由配置**:
```typescript
export const routes = [
  {
    path: '/auth',
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'recovery', component: RecoveryPage },
      { path: 'verify', component: VerifyPage },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute />,
    children: [
      { index: true, component: DashboardPage },
    ],
  },
  {
    path: '/workspace/:fileId',
    element: <PrivateRoute />,
    children: [
      { index: true, component: WorkspacePage },
    ],
  },
  {
    path: '/viewer/:fileId',
    children: [
      { index: true, component: ViewerPage },
    ],
  },
  {
    path: '/settings',
    element: <PrivateRoute />,
    children: [
      { index: true, component: SettingsPage },
    ],
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
```

---

### 第九阶段：测试文件 (第 9-10 周)

#### 9.1 单元测试

| 测试类别 | 文件数 | 目标路径 | 优先级 | 迁移状态 |
|--------|--------|---------|--------|---------|
| 工具函数 | 15 | `test/unit/utils/` | 🔴 高 | ⬜ 未开始 |
| 类型定义 | 5 | `test/unit/types/` | 🟡 中 | ⬜ 未开始 |
| Store 切片 | 8 | `test/unit/store/` | 🔴 高 | ⬜ 未开始 |
| Hooks | 10 | `test/unit/hooks/` | 🔴 高 | ⬜ 未开始 |
| Services | 8 | `test/unit/services/` | 🔴 高 | ⬜ 未开始 |
| 组件 | 30 | `test/unit/components/` | 🟡 中 | ⬜ 未开始 |
| **小计** | **76** | | | |

**测试文件示例**:
```
test/unit/
├── utils/
│   ├── geom.test.ts
│   ├── format.test.ts
│   ├── parse.test.ts
│   └── dom.test.ts
├── store/
│   ├── auth.test.ts
│   ├── common.test.ts
│   ├── modal.test.ts
│   └── notifications.test.ts
├── hooks/
│   ├── useAuth.test.ts
│   ├── useWorkspace.test.ts
│   ├── useSelection.test.ts
│   └── useCanvas.test.ts
├── services/
│   ├── auth.service.test.ts
│   ├── project.service.test.ts
│   ├── file.service.test.ts
│   └── api.client.test.ts
└── components/
    ├── Button.test.tsx
    ├── Input.test.tsx
    ├── LoginForm.test.tsx
    └── DashboardPage.test.tsx
```

#### 9.2 集成测试

| 测试场景 | 文件 | 优先级 | 迁移状态 |
|--------|------|--------|---------|
| 认证流程 | auth-flow.test.ts | 🔴 高 | ⬜ 未开始 |
| 仪表板操作 | dashboard-flow.test.ts | 🔴 高 | ⬜ 未开始 |
| 工作区操作 | workspace-flow.test.ts | 🔴 高 | ⬜ 未开始 |
| 数据持久化 | persistence.test.ts | 🟡 中 | ⬜ 未开始 |

#### 9.3 E2E 测试

| 测试场景 | 文件 | 浏览器 | 迁移状态 |
|--------|------|--------|---------|
| 完整登录流程 | e2e/auth.spec.ts | Chrome | ⬜ 未开始 |
| 创建项目 | e2e/project.spec.ts | Chrome | ⬜ 未开始 |
| 编辑设计 | e2e/workspace.spec.ts | Chrome | ⬜ 未开始 |
| 导出文件 | e2e/export.spec.ts | Chrome | ⬜ 未开始 |

---

## 📊 统计汇总

### 文件数统计
```
工具函数：          20+ 文件
类型定义：          10+ 文件
核心库：            15+ 文件
状态管理：          15+ 文件
UI 组件：           50+ 文件
页面：              10+ 文件
Services：          10+ 文件
Hooks：             10+ 文件
路由和集成：        5+ 文件
测试：              100+ 文件
文档：              5+ 文件
───────────────────────────
总计：              260+ 文件
```

### 代码行数估计
```
工具函数：          2,000 行
类型定义：          2,000 行
核心库：            2,000 行
状态管理：          2,500 行
UI 组件：           15,000 行
页面：              10,000 行
Services：          2,000 行
Hooks：             1,000 行
路由和集成：        1,000 行
测试：              20,000 行
───────────────────────────
总计：              57,500 行
```

---

## 🎯 迁移优先级指南

### 🔴 高优先级 (必须完成)
- 基础工具函数
- 类型系统
- Store 和状态管理
- 认证页面和功能
- 核心组件库
- API 客户端
- 关键 Hooks

### 🟡 中优先级 (应该完成)
- 仪表板页面
- 工作区页面
- 其他 Service
- 额外 Hooks
- 单元测试
- 集成测试

### 🟢 低优先级 (可以后来完成)
- 高级功能
- 优化和性能
- E2E 测试
- 文档完善
- WebSocket 功能

---

**创建日期**: 2024-11-09  
**最后更新**: 2024-11-09  
**维护者**: Frontend 迁移团队  
**项目路径**: `/Users/sanfengliao/workspace/penpot-ts`
