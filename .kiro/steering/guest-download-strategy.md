---
inclusion: always
---

# 匿名用户下载策略 SOP

## 需求概述
- **匿名用户**：首次可免费下载字幕 1 次，AI 总结需登录
- **第二次下载**：必须登录并扣除 1 积分
- **防滥用**：多层追踪机制

## 实现架构

### 1. 数据库 Schema 更新

```prisma
// 新增：访客使用记录表
model guest_usage {
  id          Int      @id @default(autoincrement())
  fingerprint String   @unique  // IP + UserAgent 哈希
  ip          String   @db.VarChar(45)
  userAgent   String?  @db.Text
  downloadCount Int    @default(1)
  lastUsedAt  DateTime @default(now()) @map("last_used_at")
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([ip, createdAt])
  @@map("guest_usage")
}
```

### 2. API 端点职责

#### `/api/subtitle/guest-download` (更新)
- **用途**：匿名用户首次下载
- **限制**：每个设备指纹只能使用 1 次
- **追踪**：IP + UserAgent + 客户端标识
- **返回**：字幕文件 + 剩余次数标识

#### `/api/subtitle/download-single` (保持)
- **用途**：登录用户下载
- **要求**：Bearer Token + 1 积分
- **行为**：下载成功后扣除积分

#### `/api/ai-summary` (保持)
- **用途**：AI 总结
- **要求**：必须登录 + 2 积分

### 3. 客户端逻辑

```typescript
// 检查是否已使用免费额度
function hasUsedFreeDownload(): boolean {
  const localStorage = window.localStorage.getItem('guest_download_used')
  const cookie = document.cookie.includes('guest_used=1')
  return localStorage === 'true' || cookie
}

// 下载字幕流程
async function downloadSubtitle(url: string) {
  const { user } = useAuth()

  if (user) {
    // 已登录：使用 download-single（扣积分）
    return await fetch('/api/subtitle/download-single', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url })
    })
  } else {
    // 未登录：检查是否已使用免费额度
    if (hasUsedFreeDownload()) {
      // 提示登录
      showLoginModal('You have used your free download. Please login to continue.')
      return
    }

    // 使用免费下载
    const response = await fetch('/api/subtitle/guest-download', {
      method: 'POST',
      body: JSON.stringify({ url })
    })

    if (response.ok) {
      // 标记已使用
      localStorage.setItem('guest_download_used', 'true')
      document.cookie = 'guest_used=1; max-age=31536000'
    }

    return response
  }
}
```

### 4. 防滥用策略

**客户端层（可绕过，仅提示）**
- LocalStorage 标记
- Cookie 标记（1年有效期）

**服务端层（核心防护）**
- 设备指纹：`SHA256(IP + UserAgent + Accept-Language)`
- 数据库记录：每个指纹只允许 1 次
- IP 限制：同一 IP 每天最多 5 个不同指纹

**Rate Limiting**
- 匿名用户：每 IP 每小时最多 3 次请求
- 登录用户：每用户每分钟最多 10 次请求

### 5. 用户体验优化

**首次访问**
```
[下载按钮] "Free Download" (绿色)
提示：First download is free, no login required!
```

**已使用免费额度**
```
[下载按钮] "Login to Download" (蓝色)
提示：You've used your free download. Login for unlimited access!
```

**登录后**
```
[下载按钮] "Download (1 credit)"
显示：Remaining credits: X
```

### 6. 数据迁移

```sql
-- 创建新表
CREATE TABLE guest_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fingerprint VARCHAR(64) UNIQUE NOT NULL,
  ip VARCHAR(45) NOT NULL,
  user_agent TEXT,
  download_count INT DEFAULT 1,
  last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ip_created (ip, created_at)
);
```

## 实施步骤

### Phase 1: 数据库准备
1. ✅ 更新 Prisma schema
2. ✅ 运行 `prisma migrate dev`
3. ✅ 验证表创建成功

### Phase 2: API 实现
1. ✅ 更新 `/api/subtitle/guest-download`
2. ✅ 创建指纹生成工具函数
3. ✅ 添加使用记录检查逻辑
4. ✅ 测试 API 端点

### Phase 3: 前端集成
1. ✅ 更新下载按钮组件
2. ✅ 添加状态检查逻辑
3. ✅ 实现登录提示弹窗
4. ✅ 添加剩余次数显示

### Phase 4: 测试验证
1. ✅ 匿名用户首次下载
2. ✅ 匿名用户第二次下载（应提示登录）
3. ✅ 清除 Cookie/LocalStorage 后测试（应被服务端拦截）
4. ✅ 登录用户下载（应扣积分）
5. ✅ AI 总结功能（应要求登录）

## 监控指标

- 匿名下载转化率：`登录用户数 / 匿名下载数`
- 滥用检测：同一指纹多次尝试的次数
- 平均转化时间：从首次下载到登录的时间

## 注意事项

⚠️ **隐私合规**
- 不存储完整 UserAgent（仅存储哈希）
- IP 地址仅用于防滥用，不用于追踪

⚠️ **边界情况**
- VPN 用户：可能共享 IP，使用指纹区分
- 企业网络：多用户同一 IP，指纹可区分
- 浏览器隐私模式：每次新指纹，但 IP 限制仍生效
