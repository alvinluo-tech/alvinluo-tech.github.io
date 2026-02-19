import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// R2 CDN 基础 URL
const R2_BASE_URL = 'https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/';

/**
 * 从 HTML 中提取图片信息
 */
function extractImageInfo(html) {
  const srcMatch = html.match(/src="([^"]+)"/);
  const altMatch = html.match(/alt="([^"]*)"/);
  const captionMatch = html.match(/<figcaption[^>]*>([^<]+)<\/figcaption>/);
  
  let src = srcMatch ? srcMatch[1] : '';
  const alt = altMatch ? altMatch[1] : '';
  const caption = captionMatch ? captionMatch[1].trim() : '';
  
  // 从完整 URL 中提取文件名
  if (src.startsWith(R2_BASE_URL)) {
    src = src.replace(R2_BASE_URL, '');
  }
  
  return { 
    src, 
    alt: alt || caption || '图片', 
    caption 
  };
}

/**
 * 生成 ImageSetter 组件代码
 */
function generateImageSetterCode({ src, alt, caption }) {
  const captionProp = caption ? ` caption="${caption}"` : '';
  return `<ImageSetter src="${src}" alt="${alt}"${captionProp} />`;
}

/**
 * 迁移单个文件
 */
function migrateFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 检查是否包含旧的图片 HTML 代码
  const imagePattern = /<div[^>]*style="[^"]*display:\s*flex[^"]*"[^>]*>[\s\S]*?<figure[^>]*>[\s\S]*?<img[\s\S]*?<\/figure>[\s\S]*?<\/div>/g;
  
  const matches = content.match(imagePattern);
  
  if (!matches || matches.length === 0) {
    console.log(`⏭️  跳过: ${path.basename(filePath)} (未找到旧格式图片)`);
    return { skipped: true };
  }
  
  let newContent = content;
  let replacements = 0;
  
  // 检查是否已经有 import 语句
  const hasImport = content.includes("import ImageSetter from");
  
  // 如果没有 import，添加它
  if (!hasImport) {
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd !== -1) {
      const insertPosition = frontmatterEnd + 3;
      const before = content.slice(0, insertPosition);
      const after = content.slice(insertPosition);
      newContent = before + "\n\nimport ImageSetter from '@/components/misc/ImageSetter.astro';\n" + after;
    }
  }
  
  // 替换所有图片 HTML
  newContent = newContent.replace(imagePattern, (match) => {
    try {
      const imageInfo = extractImageInfo(match);
      replacements++;
      return generateImageSetterCode(imageInfo);
    } catch (error) {
      console.warn(`⚠️  警告: 无法解析图片 HTML，保持原样`);
      return match;
    }
  });
  
  if (dryRun) {
    console.log(`🔍 [预览] ${path.basename(filePath)}: 将替换 ${replacements} 个图片`);
    return { replaced: replacements, dryRun: true };
  }
  
  // 确定新文件路径（.md -> .mdx）
  const newPath = filePath.replace(/\.md$/, '.mdx');
  
  // 写入新内容
  fs.writeFileSync(newPath, newContent, 'utf-8');
  
  // 如果文件名改变了，删除旧文件
  if (newPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  console.log(`✅ 迁移完成: ${path.basename(newPath)} (替换了 ${replacements} 个图片)`);
  
  return { replaced: replacements, newPath };
}

/**
 * 递归迁移目录
 */
function migrateDirectory(dir, options = {}) {
  const { dryRun = false, recursive = true } = options;
  
  const stats = {
    total: 0,
    migrated: 0,
    skipped: 0,
    errors: 0,
    totalReplacements: 0
  };
  
  function processDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && recursive) {
        processDir(itemPath);
      } else if (stat.isFile() && (itemPath.endsWith('.md') || itemPath.endsWith('.mdx'))) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        
        // 只处理包含旧图片 HTML 的文件
        if (content.includes('display: flex') && content.includes('justify-content: center')) {
          stats.total++;
          
          try {
            const result = migrateFile(itemPath, dryRun);
            
            if (result.skipped) {
              stats.skipped++;
            } else {
              stats.migrated++;
              stats.totalReplacements += result.replaced;
            }
          } catch (error) {
            stats.errors++;
            console.error(`❌ 错误: ${path.basename(itemPath)} - ${error.message}`);
          }
        }
      }
    }
  }
  
  processDir(dir);
  
  return stats;
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const targetPath = args.find(arg => !arg.startsWith('-')) || './src/content/posts';
  
  console.log('🚀 ImageSetter 迁移工具\n');
  
  if (dryRun) {
    console.log('📋 预览模式（不会实际修改文件）\n');
  }
  
  const fullPath = path.resolve(process.cwd(), targetPath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 错误: 路径不存在: ${fullPath}`);
    process.exit(1);
  }
  
  const stat = fs.statSync(fullPath);
  
  console.log(`📂 目标路径: ${fullPath}\n`);
  
  let stats;
  
  if (stat.isDirectory()) {
    stats = migrateDirectory(fullPath, { dryRun });
  } else if (stat.isFile()) {
    const result = migrateFile(fullPath, dryRun);
    stats = {
      total: 1,
      migrated: result.skipped ? 0 : 1,
      skipped: result.skipped ? 1 : 0,
      errors: 0,
      totalReplacements: result.replaced || 0
    };
  }
  
  // 输出统计信息
  console.log('\n' + '='.repeat(50));
  console.log('📊 迁移统计');
  console.log('='.repeat(50));
  console.log(`总文件数: ${stats.total}`);
  console.log(`成功迁移: ${stats.migrated}`);
  console.log(`跳过: ${stats.skipped}`);
  console.log(`错误: ${stats.errors}`);
  console.log(`图片替换总数: ${stats.totalReplacements}`);
  console.log('='.repeat(50));
  
  if (dryRun) {
    console.log('\n💡 提示: 移除 --dry-run 参数以实际执行迁移');
  } else {
    console.log('\n✨ 迁移完成！');
  }
}

// 执行
main();
