# 西班牙语 SEO 关键词审计报告

**审计日期**: 2026-03-04
**语言**: 西班牙语 (es)

---

## 1. 关键词数据分析

### 主关键词候选

| 关键词                          | 搜索量/月 | KD  | 优先级      |
| ------------------------------- | --------- | --- | ----------- |
| descargar subtitulos youtube    | 1,000     | 22  | ⭐⭐⭐ 最高 |
| descarga subtitulos youtube     | 320       | 21  | ⭐⭐ 高     |
| subtitulos youtube descargar    | 320       | 21  | ⭐⭐ 高     |
| descargar subtitulos de youtube | 210       | 16  | ⭐⭐ 高     |
| descarga subtitulos de youtube  | 170       | 18  | ⭐ 中       |

### 关键发现

**1. 拼写变体问题**

- ❌ "subtítulos" (带重音) - 搜索量较低
- ✅ "subtitulos" (无重音) - 搜索量更高
- **结论**: 应优先使用无重音版本

**2. 动词形式**

- "descargar" (不定式) - 1,000 + 210 = 1,210 总搜索量
- "descarga" (命令式/名词) - 320 + 170 = 490 总搜索量
- **结论**: "descargar" 形式搜索量更大

**3. 介词使用**

- "descargar subtitulos youtube" (无介词) - 1,000
- "descargar subtitulos de youtube" (有介词) - 210
- **结论**: 无介词版本搜索量更大

**4. 长尾词分析**

- 很多长尾词与"下载视频+字幕"相关
- 这些不适合我们的产品（我们只下载字幕，不下载视频）
- 应避免使用这些长尾词，以免误导用户

---

## 2. 当前 es.json 审计

### 当前关键词使用情况

**metadata.title**:

```
"Descargador de Subtítulos de YouTube - Descarga SRT, VTT, TXT Gratis | YTVidHub"
```

- ❌ 使用 "Descargador de Subtítulos" (名词形式)
- ❌ 使用 "Subtítulos" (带重音)
- ⚠️ 主关键词不在标题开头

**metadata.keywords**:

```
"descargador de subtítulos de youtube, descargar subtítulos de youtube, descargador de subtítulos gratis, descarga masiva de subtítulos de youtube"
```

- ❌ 使用 "subtítulos" (带重音)
- ⚠️ 缺少最高搜索量的关键词 "descargar subtitulos youtube"

**hero.title**:

```
"Descargador de Subtítulos de YouTube"
```

- ❌ 使用名词形式而非动词形式
- ❌ 使用带重音的 "Subtítulos"

**hero.subtitle**:

```
"Descarga subtítulos de cualquier video, playlist o canal de YouTube..."
```

- ✅ 使用 "Descarga subtítulos"
- ❌ 使用带重音的 "subtítulos"

### 关键词密度统计

**"descargar subtitulos" 及其变体出现次数**:

- metadata.title: 1 次 (Descargador, Descarga)
- metadata.keywords: 3 次
- hero.title: 1 次 (Descargador)
- hero.subtitle: 1 次 (Descarga)

**总计**: 约 6 次
**关键词密度**: 约 1.2%

**评估**: ⚠️ 密度偏低，且使用了错误的拼写变体

---

## 3. 问题总结

### 🔴 严重问题

1. **拼写错误**: 全部使用带重音的 "subtítulos"，而数据显示无重音的 "subtitulos" 搜索量更大
2. **关键词形式错误**: 使用 "Descargador de Subtítulos" (名词) 而非 "descargar subtitulos" (动词)
3. **主关键词缺失**: 最高搜索量的 "descargar subtitulos youtube" 未被充分使用

### ⚠️ 次要问题

4. **关键词密度不足**: 主关键词出现次数偏少
5. **关键词位置不佳**: 主关键词未在 title 开头

---

## 4. 优化建议

### 建议的主关键词

**主关键词**: descargar subtitulos youtube (1,000/月, KD 22)

**次要关键词**:

- descarga subtitulos youtube (320/月)
- descargar subtitulos de youtube (210/月)

**长尾词**:

- descargar subtitulos youtube gratis
- descargar subtitulos youtube srt
- descargar subtitulos youtube online
