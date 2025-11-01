import type { CommentConfig } from "../types/config";

export const commentConfig: CommentConfig = {
  enable: true, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
  enableVisitorCount: true, // 启用文章访问量统计功能。当设置为 false 时，文章访问量统计将不会显示。需要enable和enableVisitorCount都为true时才启用。
  twikoo: {
    envId: "https://twikoo-vercel-xi-nine.vercel.app/",
    lang: "zh-CN", // 默认语言，运行时会根据用户选择动态切换
  },
};
