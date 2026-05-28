"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  getStories, 
  saveStory, 
  createStory, 
  deleteStory, 
  getReadinessScore,
  resetStories,
  syncStoriesFromServer
} from "@/data/store";
import { Story, StoryPage, SafetyChecklist, INITIAL_STORIES } from "@/data/mockStories";
import { 
  LayoutDashboard, 
  Edit, 
  Share2, 
  ShieldCheck, 
  BarChart3, 
  Plus, 
  Trash2, 
  Save, 
  FileCheck, 
  CheckSquare, 
  AlertCircle,
  Eye,
  Sparkles,
  Download,
  Calendar,
  Volume2,
  FileText,
  Clock,
  ExternalLink,
  RefreshCw,
  Info,
  BookOpen
} from "lucide-react";


function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"stories" | "editor" | "publishing" | "safety" | "analytics">("stories");

  // State
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryId, setSelectedStoryId] = useState<string>("");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [mounted, setMounted] = useState(false);

  // Editor specific states
  const [editForm, setEditForm] = useState<Partial<Story>>({});
  const [editorPages, setEditorPages] = useState<StoryPage[]>([]);

  // Load from store on mount
  useEffect(() => {
    const loadedStories = getStories();
    setStories(loadedStories);
    if (loadedStories.length > 0) {
      const defaultStoryId = searchParams.get("storyId") || loadedStories[0].id;
      setSelectedStoryId(defaultStoryId);
      const current = loadedStories.find(s => s.id === defaultStoryId) || loadedStories[0];
      setSelectedStory(current);
      setEditForm(current);
      setEditorPages(current.pages || []);
    }
    
    const tabParam = searchParams.get("tab");
    if (tabParam && ["stories", "editor", "publishing", "safety", "analytics"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
    
    setMounted(true);

    // Sync from Server DB in the background
    syncStoriesFromServer().then(synced => {
      setStories(synced);
      if (synced.length > 0) {
        const defaultStoryId = searchParams.get("storyId") || synced[0].id;
        const current = synced.find(s => s.id === defaultStoryId) || synced[0];
        setSelectedStoryId(defaultStoryId);
        setSelectedStory(current);
        setEditForm(current);
        setEditorPages(current.pages || []);
      }
    });
  }, [searchParams]);


  // Sync tab change to URL
  const changeTab = (tab: "stories" | "editor" | "publishing" | "safety" | "analytics", storyId?: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams();
    params.set("tab", tab);
    if (storyId || selectedStoryId) {
      params.set("storyId", storyId || selectedStoryId);
    }
    router.push(`/admin?${params.toString()}`);
  };

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    const current = stories.find(s => s.id === id);
    if (current) {
      setSelectedStory(current);
      setEditForm(current);
      setEditorPages(current.pages || []);
      const params = new URLSearchParams(searchParams.toString());
      params.set("storyId", id);
      router.push(`/admin?${params.toString()}`);
    }
  };

  const handleResetData = () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục dữ liệu 12 truyện mẫu mặc định không? Các thay đổi của bạn sẽ bị ghi đè.")) {
      resetStories();
      const loaded = getStories();
      setStories(loaded);
      if (loaded.length > 0) {
        handleSelectStory(loaded[0].id);
      }
      alert("Đã khôi phục dữ liệu mẫu thành công.");
    }
  };

  // Editor Handlers
  const handleInputChange = (field: keyof Story, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChecklistChange = (key: keyof SafetyChecklist, checked: boolean) => {
    setEditForm(prev => {
      const updatedChecklist = {
        ...(prev.safetyChecklist || {} as SafetyChecklist),
        [key]: checked
      };
      return {
        ...prev,
        safetyChecklist: updatedChecklist as SafetyChecklist
      };
    });
  };

  // Page Editor Handlers
  const handlePageTextChange = (idx: number, field: "text" | "textEn" | "illustrationUrl", value: string) => {
    const updatedPages = [...editorPages];
    updatedPages[idx] = {
      ...updatedPages[idx],
      [field]: value
    };
    setEditorPages(updatedPages);
  };

  const handleAddPage = () => {
    const newPage: StoryPage = {
      pageNumber: editorPages.length + 1,
      text: "Nhập nội dung trang mới...",
      textEn: "Enter English content...",
      illustrationUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
    };
    setEditorPages([...editorPages, newPage]);
  };

  const handleRemovePage = (idx: number) => {
    const updatedPages = editorPages.filter((_, i) => i !== idx).map((page, i) => ({
      ...page,
      pageNumber: i + 1
    }));
    setEditorPages(updatedPages);
  };

  // Save changes to database
  const handleSave = () => {
    if (!editForm.title || !editForm.id) {
      alert("Vui lòng nhập đầy đủ Mã Truyện và Tiêu Đề.");
      return;
    }

    const storyToSave: Story = {
      ...selectedStory!, // Default values
      ...editForm,       // Form overrides
      pages: editorPages  // Edited pages
    } as Story;

    // Word count / Page count calculations
    storyToSave.pageCount = editorPages.length;
    storyToSave.wordCount = editorPages.reduce((acc, p) => acc + (p.text ? p.text.split(" ").length : 0), 0);

    saveStory(storyToSave);
    
    // Update local states
    const updatedStories = getStories();
    setStories(updatedStories);
    setSelectedStory(storyToSave);
    alert("Đã lưu thông tin truyện thành công!");
    changeTab("stories");
  };

  // Create new story
  const handleCreateNew = () => {
    const newId = `story-${Date.now()}`;
    const newStoryData: Story = {
      id: newId,
      title: "Truyện Mới Chưa Đặt Tên",
      seriesName: "Loạt truyện giáo dục",
      ageGroup: "3-8",
      topic: "Kỹ năng sống",
      mainEmotion: "Vui vẻ",
      skill: "Lắng nghe",
      description: "Mô tả ngắn gọn về nội dung truyện...",
      longDescription: "Mô tả chi tiết và sâu sắc hơn về cốt truyện...",
      storyText: "Nội dung trích dẫn chính...",
      wordCount: 0,
      pageCount: 1,
      readDuration: 3,
      audioDuration: 4,
      language: "vi",
      author: "Biên tập viên",
      illustrator: "Họa sĩ",
      voiceNarrator: "Người kể chuyện",
      copyrightStatus: "Bảo lưu bản quyền Bảo Bối",
      seoTitle: "Truyện mới | Bảo Bối Story Hub",
      seoDescription: "Mô tả chuẩn SEO cho câu chuyện mới.",
      keywords: ["truyện mới", "bảo bối"],
      thumbnailHorizontal: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
      thumbnailVertical: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop",
      squareImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop",
      audioFile: "/audio/mock-audio.mp3",
      reviewStatus: "draft",
      safetyChecklist: {
        noHarmfulContent: false,
        noDirectAdvertising: false,
        noOpenChat: true, // defaults
        noUnmoderatedComments: true,
        noExcessiveDataCollection: true,
        noRealChildImages: true,
        noAIWithoutHumanReview: false,
        ageAppropriateVocab: false,
        positiveEmotionalFraming: false,
        parentDiscussionQuestions: false,
        copyrightChecked: false,
        finalHumanApproval: false
      },
      parentGuide: {
        educationalValue: "Giá trị giáo dục của câu chuyện này là...",
        discussionQuestions: [
          "Câu hỏi thảo luận thứ nhất?",
          "Câu hỏi thảo luận thứ hai?"
        ]
      },
      pages: [
        {
          pageNumber: 1,
          text: "Nội dung trang 1...",
          illustrationUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
        }
      ],
      socialOutputs: {
        website: { title: "Tiêu đề web", caption: "Mô tả", hashtags: "#web", format: "Article", aspectRatio: "16:9", duration: "3m", thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "automatic", warningRequired: false },
        youtubeLong: { title: "Tiêu đề YT", caption: "Mô tả", hashtags: "#yt", format: "Video 16:9", aspectRatio: "16:9", duration: "4m", thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        youtubeShorts: { title: "YT Shorts", caption: "Mô tả", hashtags: "#shorts", format: "Video 9:16", aspectRatio: "9:16", duration: "0:50", thumbnail: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        tiktok: { title: "Tiktok", caption: "Mô tả", hashtags: "#tiktok", format: "Video 9:16", aspectRatio: "9:16", duration: "0:50", thumbnail: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        facebook: { title: "Facebook post", caption: "Caption đăng", hashtags: "#facebook", format: "Post", aspectRatio: "1:1", duration: "N/A", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        instagramCarousel: { title: "Insta", caption: "Mô tả", hashtags: "#insta", format: "Carousel", aspectRatio: "1:1", duration: "N/A", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        zaloOA: { title: "Zalo OA post", caption: "Mô tả", hashtags: "#zalo", format: "Bài viết", aspectRatio: "16:9", duration: "3m", thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        podcast: { title: "Podcast", caption: "Mô tả", hashtags: "#podcast", format: "Audio", aspectRatio: "N/A", duration: "4m", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false },
        newsletter: { title: "Newsletter", caption: "Mô tả", hashtags: "#email", format: "Email", aspectRatio: "N/A", duration: "3m", thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", publishStatus: "draft", scheduledDate: "", mode: "manual", warningRequired: false }
      }
    };

    createStory(newStoryData);
    const updated = getStories();
    setStories(updated);
    setSelectedStoryId(newId);
    setSelectedStory(newStoryData);
    setEditForm(newStoryData);
    setEditorPages(newStoryData.pages);
    changeTab("editor", newId);
    alert("Đã tạo truyện nháp mới! Hãy cập nhật các trường thông tin bên dưới.");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa truyện này khỏi hệ thống?")) {
      deleteStory(id);
      const updated = getStories();
      setStories(updated);
      if (updated.length > 0) {
        handleSelectStory(updated[0].id);
      }
      alert("Đã xóa truyện.");
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Banner Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-100 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-orange-500" />
            Bảo Bối CMS V2
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Trung tâm quản trị nội dung & điều phối ấn bản đa nền tảng cho trẻ em.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Dữ liệu Mẫu
          </button>
          
          <button 
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Tạo truyện mới
          </button>
        </div>
      </div>

      {/* Selected Story Context Header (for editing context) */}
      {selectedStory && (
        <div className="bg-orange-50/50 rounded-2xl border border-orange-100 p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0">
              {selectedStory.ageGroup}
            </div>
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Đang chọn: {selectedStory.seriesName} | Mã: {selectedStory.id}
              </span>
              <h4 className="font-bold text-zinc-900">{selectedStory.title}</h4>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedStoryId}
              onChange={(e) => handleSelectStory(e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 focus:border-orange-500 outline-none"
            >
              {stories.map(s => (
                <option key={s.id} value={s.id}>
                  [{s.ageGroup}] {s.title} ({s.reviewStatus})
                </option>
              ))}
            </select>

            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold text-orange-800">
              Readiness: {getReadinessScore(selectedStory)}/100
            </span>
          </div>
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 flex flex-col gap-2 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
          {[
            { id: "stories", name: "Danh sách truyện", icon: LayoutDashboard },
            { id: "editor", name: "Biên tập nội dung", icon: Edit },
            { id: "publishing", name: "Đa nền tảng (Social)", icon: Share2 },
            { id: "safety", name: "Duyệt an toàn trẻ em", icon: ShieldCheck },
            { id: "analytics", name: "Báo cáo phân tích", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id as any)}
              className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <tab.icon className="h-4.5 w-4.5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB 1: STORIES LIST */}
          {activeTab === "stories" && (
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <h2 className="font-bold text-xl text-zinc-950">Danh sách quản lý tác phẩm</h2>
                <span className="text-xs font-bold text-zinc-400 uppercase">Tổng số: {stories.length} truyện</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-600">
                  <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Tên tác phẩm</th>
                      <th className="px-4 py-3">Độ tuổi</th>
                      <th className="px-4 py-3">Chủ đề</th>
                      <th className="px-4 py-3">Điểm sẵn sàng</th>
                      <th className="px-4 py-3">Trạng thái</th>
                      <th className="px-4 py-3 rounded-r-lg text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {stories.map((story) => (
                      <tr key={story.id} className={`hover:bg-zinc-50/50 transition-colors ${selectedStoryId === story.id ? "bg-orange-50/20" : ""}`}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={story.squareImage}
                              alt={story.title}
                              className="h-10 w-10 rounded-lg object-cover bg-zinc-100"
                            />
                            <div>
                              <div className="font-bold text-zinc-955">{story.title}</div>
                              <div className="text-[10px] text-zinc-400 font-medium">Tác giả: {story.author}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-bold text-zinc-700">{story.ageGroup} tuổi</td>
                        <td className="px-4 py-4 text-xs font-medium">{story.topic}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            getReadinessScore(story) >= 80 
                              ? "bg-emerald-50 text-emerald-700" 
                              : getReadinessScore(story) >= 50 
                                ? "bg-amber-50 text-amber-700" 
                                : "bg-red-50 text-red-700"
                          }`}>
                            {getReadinessScore(story)}/100
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
                            story.reviewStatus === "published" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : story.reviewStatus === "approved" 
                                ? "bg-blue-100 text-blue-800"
                                : story.reviewStatus === "pending_review"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-zinc-100 text-zinc-800"
                          }`}>
                            {story.reviewStatus.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                handleSelectStory(story.id);
                                changeTab("editor");
                              }}
                              className="rounded p-1 text-zinc-500 hover:text-orange-500 hover:bg-zinc-100 transition-colors"
                              title="Chỉnh sửa nội dung"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                handleSelectStory(story.id);
                                changeTab("publishing");
                              }}
                              className="rounded p-1 text-zinc-500 hover:text-purple-500 hover:bg-zinc-100 transition-colors"
                              title="Ấn bản mạng xã hội"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(story.id)}
                              className="rounded p-1 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 transition-colors"
                              title="Xóa tác phẩm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: STORY EDITOR PAGE */}
          {activeTab === "editor" && selectedStory && (
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <h2 className="font-bold text-xl text-zinc-950 flex items-center gap-2">
                  <Edit className="h-5.5 w-5.5 text-orange-500" />
                  Biên tập thông tin & nội dung tác phẩm
                </h2>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Lưu thay đổi
                </button>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Mã định danh (Story ID)</label>
                  <input
                    type="text"
                    value={editForm.id || ""}
                    disabled
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs outline-none cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Tên bộ truyện (Series)</label>
                  <input
                    type="text"
                    value={editForm.seriesName || ""}
                    onChange={(e) => handleInputChange("seriesName", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Nhóm tuổi mục tiêu</label>
                  <select
                    value={editForm.ageGroup || "3-8"}
                    onChange={(e) => handleInputChange("ageGroup", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none focus:border-orange-500"
                  >
                    <option value="3-8">3–8 tuổi</option>
                    <option value="9-12">9–12 tuổi</option>
                    <option value="12-15">12–15 tuổi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Tiêu đề Việt (VI)</label>
                  <input
                    type="text"
                    value={editForm.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-sm font-semibold outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Tiêu đề Anh (EN) - Không bắt buộc</label>
                  <input
                    type="text"
                    value={editForm.titleEn || ""}
                    onChange={(e) => handleInputChange("titleEn", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-sm italic outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Education Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Chủ đề giáo dục</label>
                  <input
                    type="text"
                    value={editForm.topic || ""}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    placeholder="Gia đình, Khoa học..."
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Cảm xúc chủ đạo</label>
                  <input
                    type="text"
                    value={editForm.mainEmotion || ""}
                    onChange={(e) => handleInputChange("mainEmotion", e.target.value)}
                    placeholder="Yêu thương, tò mò..."
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Kỹ năng / Bài học</label>
                  <input
                    type="text"
                    value={editForm.skill || ""}
                    onChange={(e) => handleInputChange("skill", e.target.value)}
                    placeholder="Sẻ chia, tự lập..."
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-500">Mô tả ngắn (Description)</label>
                <textarea
                  rows={2}
                  value={editForm.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-500">Mô tả chi tiết (Long Description)</label>
                <textarea
                  rows={4}
                  value={editForm.longDescription || ""}
                  onChange={(e) => handleInputChange("longDescription", e.target.value)}
                  className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none focus:border-orange-500"
                />
              </div>

              {/* Attachments Placeholders */}
              <div className="bg-orange-50/20 border border-orange-100 rounded-xl p-4 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Đính kèm tệp tin đa phương tiện (Mock Uploads)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500">Thumbnail Ngang (Illustration URL)</label>
                    <input
                      type="text"
                      value={editForm.thumbnailHorizontal || ""}
                      onChange={(e) => handleInputChange("thumbnailHorizontal", e.target.value)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500">Ảnh bìa Vuông (Square Image URL)</label>
                    <input
                      type="text"
                      value={editForm.squareImage || ""}
                      onChange={(e) => handleInputChange("squareImage", e.target.value)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500">Tệp tin Audio (.mp3 URL)</label>
                    <input
                      type="text"
                      value={editForm.audioFile || ""}
                      onChange={(e) => handleInputChange("audioFile", e.target.value)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Creators Credits & Copyright */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Tác giả văn học</label>
                  <input
                    type="text"
                    value={editForm.author || ""}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Họa sĩ minh họa</label>
                  <input
                    type="text"
                    value={editForm.illustrator || ""}
                    onChange={(e) => handleInputChange("illustrator", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Người kể chuyện (Voice)</label>
                  <input
                    type="text"
                    value={editForm.voiceNarrator || ""}
                    onChange={(e) => handleInputChange("voiceNarrator", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Trạng thái bản quyền</label>
                  <input
                    type="text"
                    value={editForm.copyrightStatus || ""}
                    onChange={(e) => handleInputChange("copyrightStatus", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                  />
                </div>
              </div>

              {/* Publishing & Review Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-150 pt-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Trạng thái phát hành</label>
                  <select
                    value={editForm.reviewStatus || "draft"}
                    onChange={(e) => handleInputChange("reviewStatus", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                  >
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="pending_review">Chờ duyệt (Pending Review)</option>
                    <option value="approved">Đã phê duyệt (Approved)</option>
                    <option value="scheduled">Lên lịch đăng (Scheduled)</option>
                    <option value="published">Xuất bản (Published)</option>
                    <option value="needs_revision">Cần sửa chữa (Needs Revision)</option>
                    <option value="emergency_removed">Hạ khẩn cấp (Emergency Removed)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Ngày lên lịch đăng</label>
                  <input
                    type="date"
                    value={editForm.scheduledPublishDate || ""}
                    onChange={(e) => handleInputChange("scheduledPublishDate", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Người phê duyệt</label>
                  <input
                    type="text"
                    value={editForm.reviewer || ""}
                    onChange={(e) => handleInputChange("reviewer", e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                  />
                </div>
              </div>

              {/* SEO and Metadata */}
              <div className="border-t border-zinc-150 pt-4 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-zinc-700">Tối ưu hóa công cụ tìm kiếm (SEO)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-500">Tiêu đề SEO</label>
                    <input
                      type="text"
                      value={editForm.seoTitle || ""}
                      onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-500">Mô tả SEO</label>
                    <input
                      type="text"
                      value={editForm.seoDescription || ""}
                      onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* PAGES EDITOR */}
              <div className="border-t border-zinc-150 pt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-zinc-950 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                    Biên tập nội dung từng trang ({editorPages.length} trang)
                  </h3>
                  <button
                    onClick={handleAddPage}
                    className="inline-flex items-center gap-1 rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Thêm trang
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {editorPages.map((page, index) => (
                    <div key={index} className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 relative flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full">
                          Trang {page.pageNumber}
                        </span>
                        <button
                          onClick={() => handleRemovePage(index)}
                          className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-0.5"
                          disabled={editorPages.length <= 1}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Xóa trang
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-zinc-400">Nội dung Tiếng Việt</label>
                            <textarea
                              rows={3}
                              value={page.text || ""}
                              onChange={(e) => handlePageTextChange(index, "text", e.target.value)}
                              className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-zinc-400">Nội dung Tiếng Anh (Tùy chọn)</label>
                            <textarea
                              rows={3}
                              value={page.textEn || ""}
                              onChange={(e) => handlePageTextChange(index, "textEn", e.target.value)}
                              className="rounded-lg border border-zinc-200 bg-white p-2 text-xs outline-none"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-zinc-400">Ảnh minh họa trang</label>
                          <input
                            type="text"
                            value={page.illustrationUrl || ""}
                            onChange={(e) => handlePageTextChange(index, "illustrationUrl", e.target.value)}
                            className="rounded-lg border border-zinc-200 bg-white p-2 text-xs mb-2"
                          />
                          <div className="aspect-video w-full rounded-lg bg-zinc-150 overflow-hidden border border-zinc-200">
                            {page.illustrationUrl ? (
                              <img
                                src={page.illustrationUrl}
                                alt="Trang minh họa"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  // Fallback placeholder
                                  (e.target as any).src = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop";
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-zinc-400 text-xs">Chưa có ảnh</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-zinc-100 pt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => changeTab("stories")}
                  className="rounded-full border border-zinc-200 bg-white px-6 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-full bg-emerald-500 px-6 py-2 text-xs font-bold text-white shadow hover:bg-emerald-600"
                >
                  Lưu thay đổi tác phẩm
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-PLATFORM PUBLISHING DASHBOARD */}
          {activeTab === "publishing" && selectedStory && (
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <div>
                  <h2 className="font-bold text-xl text-zinc-950 flex items-center gap-2">
                    <Share2 className="h-5.5 w-5.5 text-orange-500" />
                    Bảng điều khiển Phân phối Đa nền tảng (Mock)
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Cấu hình, biên tập nội dung rút gọn và xuất bản một truyện gốc tới 9 kênh phân phối khác nhau.
                  </p>
                </div>
                
                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  Readiness: {getReadinessScore(selectedStory)}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Platform Selection */}
                {selectedStory.socialOutputs && Object.entries(selectedStory.socialOutputs).map(([platformKey, details]) => {
                  const data = details as any;
                  return (
                    <div key={platformKey} className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-5 flex flex-col justify-between gap-4">
                      
                      {/* Platform header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                            {platformKey === "youtubeLong" ? "YouTube Video" : platformKey === "youtubeShorts" ? "YouTube Shorts" : platformKey === "tiktok" ? "TikTok/Reels" : platformKey === "facebook" ? "Facebook Page" : platformKey === "instagramCarousel" ? "Instagram Carousel" : platformKey === "zaloOA" ? "Zalo OA" : platformKey === "podcast" ? "Podcast/Audio" : platformKey === "newsletter" ? "Newsletter" : "Website"}
                          </span>
                          <h3 className="font-bold text-zinc-900 mt-1 text-sm">{data.title}</h3>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                          data.publishStatus === "published" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : data.publishStatus === "ready" 
                              ? "bg-blue-100 text-blue-800"
                              : "bg-zinc-100 text-zinc-800"
                        }`}>
                          {data.publishStatus}
                        </span>
                      </div>

                      {/* Info fields */}
                      <div className="text-xs text-zinc-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Định dạng:</span>
                          <span className="font-semibold text-zinc-700">{data.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tỷ lệ khung hình:</span>
                          <span className="font-semibold text-zinc-700">{data.aspectRatio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thời lượng ước tính:</span>
                          <span className="font-semibold text-zinc-700">{data.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chế độ xuất bản:</span>
                          <span className="font-semibold text-zinc-750 capitalize">{data.mode}</span>
                        </div>
                      </div>

                      {/* Mock captions / hashtags */}
                      <div className="bg-white p-3 rounded-lg border border-zinc-100 flex flex-col gap-2">
                        <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed">
                          {data.caption}
                        </p>
                        <p className="text-[10px] font-bold text-indigo-500">
                          {data.hashtags}
                        </p>
                      </div>

                      {/* Actions buttons */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100/50 justify-end">
                        {data.warningRequired && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center gap-1 mr-auto">
                            <AlertCircle className="h-3.5 w-3.5" /> Yêu cầu duyệt thủ công
                          </span>
                        )}
                        
                        <button
                          onClick={() => {
                            alert(`[MOCK API] Đang tạo gói tài nguyên đa phương tiện (Asset Package) cho ${platformKey}:\n- Xuất hình ảnh định dạng ${data.aspectRatio}\n- Tạo tệp tin mô tả siêu dữ liệu (metadata.json)\n- Đóng gói file âm thanh.`);
                          }}
                          className="rounded-lg bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-[10px] font-bold text-zinc-700 transition-colors"
                        >
                          Tạo gói phân phối
                        </button>
                        
                        <button
                          onClick={() => {
                            alert(`[MOCK PREVIEW] Xem trước bài đăng trên ${platformKey}:\n\nTiêu đề: ${data.title}\nNội dung: ${data.caption}\nHashtags: ${data.hashtags}`);
                          }}
                          className="rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 px-3 py-1.5 text-[10px] font-bold text-zinc-700 transition-colors"
                        >
                          Xem trước bài đăng
                        </button>
                        
                        <button
                          onClick={() => {
                            alert(`[MOCK PUBLISH] Đã gửi yêu cầu ấn bản tới API ${platformKey}. Bài đăng sẽ được đưa lên hàng đợi.`);
                          }}
                          className="rounded-lg bg-orange-500 hover:bg-orange-600 px-3 py-1.5 text-[10px] font-bold text-white transition-colors"
                        >
                          Xuất bản (Mock)
                        </button>
                      </div>

                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* TAB 4: SAFETY AND REVIEW PAGE */}
          {activeTab === "safety" && selectedStory && (
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <div>
                  <h2 className="font-bold text-xl text-zinc-950 flex items-center gap-2">
                    <ShieldCheck className="h-5.5 w-5.5 text-orange-500" />
                    Quy trình kiểm duyệt An toàn Trẻ em (Safety-First)
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Checklist cam kết đảm bảo các tiêu chuẩn đạo đức, sự lành mạnh tâm lý và bản quyền của Bảo Bối Story Hub.
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  className="rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-white hover:bg-orange-600"
                >
                  Lưu phê duyệt
                </button>
              </div>

              {/* Safety Warning Info Box */}
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex gap-3 text-amber-900 text-xs">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Nguyên tắc cốt lõi: An toàn trước Sự lan truyền (Safety before Virality)</h4>
                  <p className="mt-1 leading-relaxed text-amber-800">
                    Mọi câu chuyện thiếu nhi trên hệ thống tuyệt đối không được chứa nội dung kích động bạo lực, quảng cáo trá hình nhắm tới trẻ, hoặc sử dụng các cơ chế thu thập dữ liệu cá nhân xâm phạm quyền trẻ em. Cần có sự kiểm định của ban biên tập con người trước khi đăng tải.
                  </p>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="flex flex-col gap-3">
                {[
                  { key: "noHarmfulContent", label: "Không chứa nội dung bạo lực, gây sợ hãi hoặc tiêu cực cho trẻ nhỏ." },
                  { key: "noDirectAdvertising", label: "Không chứa quảng cáo trực tiếp hoặc gián tiếp nhắm tới trẻ em." },
                  { key: "noOpenChat", label: "Không tích hợp kênh chat mở tự do với người lạ trên website." },
                  { key: "noUnmoderatedComments", label: "Không có phần bình luận công khai chưa qua kiểm duyệt." },
                  { key: "noExcessiveDataCollection", label: "Không thu thập bất cứ thông tin cá nhân dư thừa nào từ trẻ." },
                  { key: "noRealChildImages", label: "Không sử dụng hình ảnh thật của trẻ em khi chưa có sự đồng ý bằng văn bản của người giám hộ." },
                  { key: "noAIWithoutHumanReview", label: "Nội dung văn bản/hình ảnh/audio không được tự động phát hành nếu do AI sinh ra mà chưa có người biên tập duyệt." },
                  { key: "ageAppropriateVocab", label: "Từ vựng phù hợp với độ tuổi mục tiêu đã cấu hình." },
                  { key: "positiveEmotionalFraming", label: "Khung cảm xúc định hướng tích cực, dung dưỡng trí tuệ cảm xúc (EQ)." },
                  { key: "parentDiscussionQuestions", label: "Đã có sẵn bộ câu hỏi thảo luận chất lượng cho cha mẹ & bé." },
                  { key: "copyrightChecked", label: "Bản quyền hình ảnh, nội dung, âm thanh đã được xác thực hợp lệ." },
                  { key: "finalHumanApproval", label: "Đã qua kiểm định chất lượng cuối cùng bởi ban biên tập con người." }
                ].map((item) => (
                  <label 
                    key={item.key} 
                    className="flex items-start gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-pointer text-xs sm:text-sm text-zinc-700"
                  >
                    <input
                      type="checkbox"
                      checked={!!(editForm.safetyChecklist as any)?.[item.key]}
                      onChange={(e) => handleChecklistChange(item.key as any, e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-zinc-300 text-orange-500 focus:ring-orange-500 mt-0.5 shrink-0"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                <span className="text-xs font-bold text-zinc-400">
                  Tổng kết: {Object.values(editForm.safetyChecklist || {}).filter(Boolean).length} / 12 mục hoàn thành
                </span>
                <button
                  onClick={handleSave}
                  className="rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-600"
                >
                  Hoàn tất và Phê duyệt
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS MOCK DASHBOARD */}
          {activeTab === "analytics" && (
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <div>
                  <h2 className="font-bold text-xl text-zinc-950 flex items-center gap-2">
                    <BarChart3 className="h-5.5 w-5.5 text-orange-500" />
                    Báo cáo Phân tích Tương tác (Mock Analytics)
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Theo dõi số lượt đọc, lượt nghe, tỷ lệ hoàn thành tác phẩm và luồng truy cập phân phối.
                  </p>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450">Lượt đọc truyện</span>
                  <h3 className="text-2xl font-bold text-zinc-800 mt-1">12,450</h3>
                  <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">+12.5% tuần này</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450">Lượt nghe Audio</span>
                  <h3 className="text-2xl font-bold text-zinc-800 mt-1">8,920</h3>
                  <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">+8.2% tuần này</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450">Tỷ lệ Hoàn thành</span>
                  <h3 className="text-2xl font-bold text-zinc-800 mt-1">84%</h3>
                  <span className="text-[9px] text-zinc-400 font-semibold mt-1 block">Khá cao đối với trẻ nhỏ</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450">Lượt quay lại đọc</span>
                  <h3 className="text-2xl font-bold text-zinc-800 mt-1">72%</h3>
                  <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">+1.4% tháng này</span>
                </div>
              </div>

              {/* Chart & lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Loved Stories */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-sm text-zinc-700 uppercase tracking-wider border-b border-zinc-100 pb-2">
                    Tác phẩm yêu thích nhất
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "Chú Gấu Con Tìm Nụ Cười", rate: "95%", age: "3-8" },
                      { title: "Mật Mã Của Khu Rừng Cổ Đại", rate: "91%", age: "9-12" },
                      { title: "Bạn Đom Đóm Không Sợ Tối", rate: "89%", age: "3-8" },
                      { title: "Tiếng Vang Từ Đảo Trầm Hương", rate: "86%", age: "12-15" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-zinc-50/50 p-2.5 rounded-lg border border-zinc-100/50 text-xs">
                        <span className="font-bold text-zinc-700">{item.title}</span>
                        <div className="flex gap-2">
                          <span className="text-zinc-400">{item.age} tuổi</span>
                          <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{item.rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Traffic Source */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-sm text-zinc-700 uppercase tracking-wider border-b border-zinc-100 pb-2">
                    Nguồn lưu lượng phân phối
                  </h3>
                  <div className="space-y-3">
                    {[
                      { platform: "Facebook Page (Cha mẹ)", percent: "42%" },
                      { platform: "Zalo OA (Nhóm phụ huynh)", percent: "25%" },
                      { platform: "YouTube Long & Shorts", percent: "18%" },
                      { platform: "Newsletter & Podcast", percent: "15%" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span>{item.platform}</span>
                        <div className="flex items-center gap-2 w-1/2">
                          <div className="flex-1 bg-zinc-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: item.percent }}></div>
                          </div>
                          <span className="font-bold text-zinc-700 w-8 text-right">{item.percent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Suggestions */}
              <div className="rounded-xl border border-orange-100 bg-orange-50/20 p-5 flex flex-col gap-3">
                <h4 className="font-bold text-sm text-orange-850 flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-orange-500" />
                  Đề xuất kế hoạch nội dung tiếp theo
                </h4>
                <ul className="list-disc pl-5 text-xs text-orange-900 space-y-1.5 leading-relaxed">
                  <li>Lớp tuổi <strong>3–8 tuổi</strong> có chỉ số quay lại đọc cao nhất. Hãy tiếp tục phát triển loạt truyện 'Rừng Xanh Kỳ Diệu'.</li>
                  <li>Lượt nghe audio của loạt truyện 'Thám Tử Nhí' cho thấy tiềm năng làm podcast thương mại. Đề nghị đầu tư thêm chất lượng phòng thu âm thanh.</li>
                  <li>Lưu lượng chuyển đổi từ Zalo OA có tỷ lệ hoàn thành xuất sắc, đề xuất đẩy mạnh việc mock các bài gửi zalo hướng tới cha mẹ hàng tuần.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function Admin() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}
