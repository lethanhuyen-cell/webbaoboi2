export interface StoryPage {
  pageNumber: number;
  text: string;
  textEn?: string;
  illustrationUrl: string;
}

export interface SafetyChecklist {
  noHarmfulContent: boolean;
  noDirectAdvertising: boolean;
  noOpenChat: boolean;
  noUnmoderatedComments: boolean;
  noExcessiveDataCollection: boolean;
  noRealChildImages: boolean;
  noAIWithoutHumanReview: boolean;
  ageAppropriateVocab: boolean;
  positiveEmotionalFraming: boolean;
  parentDiscussionQuestions: boolean;
  copyrightChecked: boolean;
  finalHumanApproval: boolean;
}

export interface ParentGuide {
  educationalValue: string;
  discussionQuestions: string[];
}

export interface PlatformPublishingDetails {
  title: string;
  caption: string;
  hashtags: string;
  format: string;
  aspectRatio: string;
  duration: string;
  thumbnail: string;
  publishStatus: 'draft' | 'ready' | 'scheduled' | 'published' | 'failed';
  scheduledDate: string;
  mode: 'manual' | 'automatic';
  warningRequired: boolean;
}

export interface SocialOutputs {
  website: PlatformPublishingDetails;
  youtubeLong: PlatformPublishingDetails;
  youtubeShorts: PlatformPublishingDetails;
  tiktok: PlatformPublishingDetails;
  facebook: PlatformPublishingDetails;
  instagramCarousel: PlatformPublishingDetails;
  zaloOA: PlatformPublishingDetails;
  podcast: PlatformPublishingDetails;
  newsletter: PlatformPublishingDetails;
}

export interface Story {
  id: string;
  title: string;
  titleEn?: string;
  seriesName: string;
  ageGroup: '3-8' | '9-12' | '12-15';
  topic: string;
  mainEmotion: string;
  skill: string;
  description: string;
  descriptionEn?: string;
  longDescription: string;
  storyText: string;
  wordCount: number;
  pageCount: number;
  readDuration: number;
  audioDuration: number;
  language: 'vi' | 'en' | 'bilingual';
  author: string;
  illustrator: string;
  voiceNarrator: string;
  copyrightStatus: string;
  contentWarning?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  thumbnailHorizontal: string;
  thumbnailVertical: string;
  squareImage: string;
  audioFile: string;
  videoHorizontalPlaceholder?: string;
  videoVerticalPlaceholder?: string;
  reviewStatus: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'published' | 'needs_revision' | 'emergency_removed';
  reviewer?: string;
  scheduledPublishDate?: string;
  safetyChecklist: SafetyChecklist;
  parentGuide: ParentGuide;
  pages: StoryPage[];
  socialOutputs: SocialOutputs;
}

export const INITIAL_STORIES: Story[] = [
  // --- AGE GROUP 3-8 ---
  {
    id: "story-1",
    title: "Chú Gấu Con Tìm Nụ Cười",
    titleEn: "Little Bear Finds a Smile",
    seriesName: "Rừng Xanh Kỳ Diệu",
    ageGroup: "3-8",
    topic: "Cảm xúc",
    mainEmotion: "Vui vẻ",
    skill: "Nhận biết cảm xúc và chia sẻ",
    description: "Câu chuyện đáng yêu về chú gấu nâu đi tìm nụ cười bị đánh mất và học cách tìm thấy niềm vui từ những điều giản dị quanh mình.",
    descriptionEn: "A lovely story about a little brown bear who goes on a quest to find his lost smile and learns to find joy in simple things.",
    longDescription: "Gấu Con thức dậy và cảm thấy khuôn mặt mình buồn bã. Nghĩ rằng mình đã đánh mất nụ cười, Gấu Con lên đường đi tìm nó khắp rừng xanh. Qua cuộc trò chuyện với Sóc Nhỏ, Chim Sơn Ca và Rùa Già, Gấu Con nhận ra nụ cười không nằm dưới gốc cây hay trên mây cao, mà nằm ngay trong việc giúp đỡ người khác và cảm nhận tình yêu thương của gia đình.",
    storyText: "Ngày xửa ngày xưa, sâu trong rừng xanh, có một chú Gấu Con rất đáng yêu. Một buổi sáng, Gấu Con thức dậy và thấy mình không thể cười được. Gấu Con hốt hoảng nghĩ: 'Ôi, nụ cười của mình biến đi đâu mất rồi?'. Chú liền chạy ra vườn hỏi Sóc Nhỏ: 'Sóc Nhỏ ơi, bạn có thấy nụ cười của tớ ở đâu không?'. Sóc Nhỏ cười vang và nói: 'Nụ cười không rơi ở đây đâu, Gấu Con hãy tìm dưới hồ nước xem!'. Gấu Con chạy ra hồ nước, Rùa Già chậm rãi ngẩng đầu lên: 'Nụ cười nằm trong lòng con đấy, hãy làm điều gì đó tốt lành đi!'. Gấu Con quyết định giúp Sóc Nhỏ nhặt hạt dẻ rơi và chia sẻ quả táo đỏ với Rùa Già. Bỗng nhiên, một cảm giác ấm áp lan tỏa, và nụ cười rạng rỡ đã quay lại trên môi chú lúc nào không hay.",
    wordCount: 180,
    pageCount: 3,
    readDuration: 3,
    audioDuration: 4,
    language: "bilingual",
    author: "Mai Anh",
    illustrator: "Đăng Khoa",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Truyện thiếu nhi Chú Gấu Con Tìm Nụ Cười | Bảo Bối Story Hub",
    seoDescription: "Một câu chuyện ấm áp dành cho trẻ từ 3 đến 8 tuổi giúp bé nhận diện cảm xúc, rèn luyện sự sẻ chia và lòng nhân ái thông qua hành trình của chú Gấu Con tinh nghịch.",
    keywords: ["gấu con tìm nụ cười", "truyện cảm xúc", "truyện 3-8 tuổi", "bảo bối story"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    scheduledPublishDate: "2026-05-20",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Giúp trẻ nhận diện được cảm xúc buồn/vui. Khuyến khích trẻ thực hiện các hành động nhỏ như giúp đỡ bạn bè, chia sẻ đồ ăn để tự tìm thấy niềm vui trong cuộc sống.",
      discussionQuestions: [
        "Tại sao Gấu Con lại nghĩ mình bị mất nụ cười?",
        "Con cảm thấy thế nào khi làm một việc tốt giúp đỡ người khác?",
        "Khi con buồn, con thường làm gì để nụ cười quay trở lại?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Ngày xửa ngày xưa, sâu trong rừng xanh, có một chú Gấu Con rất đáng yêu. Một buổi sáng, Gấu Con thức dậy và thấy khuôn mặt mình cứ xị xuống. Chú nhìn vào gương và hốt hoảng nghĩ: 'Ôi, nụ cười của mình biến đi đâu mất rồi?'.",
        textEn: "Once upon a time, deep in the green forest, there lived a cute Little Bear. One morning, Little Bear woke up and felt his face was sad. He looked in the mirror and thought in panic: 'Oh, where has my smile gone?'",
        illustrationUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Gấu Con liền chạy ra vườn hỏi Sóc Nhỏ đang nhặt quả thông: 'Sóc Nhỏ ơi, bạn có thấy nụ cười của tớ rơi ở đâu không?'. Sóc Nhỏ cười vang và nói: 'Nụ cười không rơi ở đây đâu, nhưng tớ đang bận quá, gió thổi bay hết đống hạt dẻ của tớ rồi'. Gấu Con liền cúi xuống giúp Sóc Nhỏ nhặt hạt dẻ.",
        textEn: "Little Bear ran to the garden and asked Little Squirrel: 'Little Squirrel, have you seen my smile anywhere?'. Little Squirrel laughed: 'A smile doesn't just fall here, but I am so busy, the wind blew away all my acorns.' Little Bear bent down to help Little Squirrel collect them.",
        illustrationUrl: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Khi nhặt xong, Sóc Nhỏ tặng Gấu Con một quả táo đỏ và ôm chú thật chặt: 'Cảm ơn Gấu Con tốt bụng nhé!'. Bỗng nhiên, Gấu Con cảm nhận được một luồng hơi ấm áp. Chú soi mình xuống hồ nước, nụ cười tươi rói đã quay trở lại trên môi lúc nào không hay!",
        textEn: "When they finished, Little Squirrel gave Little Bear a red apple and hugged him tightly: 'Thank you, kind Little Bear!'. Suddenly, Little Bear felt a warm sensation. He looked at his reflection in the lake, and a bright smile had returned to his face!",
        illustrationUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Chú Gấu Con Tìm Nụ Cười - Đọc truyện có âm thanh tại Bảo Bối",
        caption: "Câu chuyện đáng yêu giúp bé nhận diện và chia sẻ cảm xúc một cách tự nhiên nhất.",
        hashtags: "#baoboi #truyenthieu nhi #nuocuoi #chamsoccamxuc",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "3 phút đọc",
        thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🐻 HÀNH TRÌNH TÌM LẠI NỤ CƯỜI CỦA GẤU CON 🐻",
        caption: "Sáng ra thấy con ỉu xìu, làm sao để con vui vẻ trở lại? Bố mẹ hãy cùng kể cho con nghe câu chuyện 'Chú Gấu Con Tìm Nụ Cười' tối nay nhé! Truyện giúp con hiểu rằng niềm vui đến từ việc chia sẻ và giúp đỡ người xung quanh.",
        hashtags: "#BaoBoiStoryHub #NuôiDạyCon #TruyệnChoBé #GiaĐình #KỹNăngSống",
        format: "Hình ảnh kèm Link bài viết",
        aspectRatio: "1:1 / 4:5",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Chú Gấu Con Tìm Nụ Cười - Truyện Cổ Tích Rừng Xanh Giúp Bé Ngủ Ngon (Audio + Minh Họa)",
        caption: "Chào mừng các bé đến với Bảo Bối Story Hub. Hôm nay chúng ta cùng lắng nghe câu chuyện về chú Gấu Con đi tìm nụ cười nhé. Giọng kể truyền cảm của chị Hướng Dương kết hợp hình ảnh minh họa sinh động sẽ đưa bé vào giấc ngủ ngon lành.",
        hashtags: "#truyenngungon #audiothieunhi #truyencotich #giaucon",
        format: "Video ngang minh họa + giọng đọc",
        aspectRatio: "16:9",
        duration: "4:12",
        thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Làm thế nào để tìm lại nụ cười bị mất? 🐻✨ #shorts",
        caption: "Gấu Con cứ nghĩ nụ cười bị gió cuốn đi, nhưng hóa ra nó lại ở ngay đây... Xem trọn bộ truyện tại Bảo Bối Story Hub nhé ba mẹ ơi!",
        hashtags: "#shorts #giaucon #truyenthieunhi #storytime #baoboi",
        format: "Video đứng ngắn",
        aspectRatio: "9:16",
        duration: "0:50",
        thumbnail: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Bí quyết giúp bé luôn mỉm cười mỗi ngày từ chú Gấu Con 🐻 #learnontiktok",
        caption: "Dạy con bài học sẻ chia cực đơn giản qua câu chuyện Gấu Con tìm nụ cười. Hãy follow Bảo Bối để xem thêm nhiều câu chuyện giáo dục ý nghĩa nhé ba mẹ!",
        hashtags: "#Master2026byTikTok #nuoidaycon #truyenthieunhi #kynangsong #baoboi",
        format: "Video đứng với phụ đề sinh động",
        aspectRatio: "9:16",
        duration: "0:55",
        thumbnail: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Dạy Bé Về Sự Chia Sẻ Qua Câu Chuyện Gấu Con 🌸",
        caption: "Trượt sang trái để đọc tóm tắt câu chuyện cực đáng yêu về chú Gấu Con đi tìm nụ cười nhé! Bản đầy đủ có âm thanh tại link tiểu sử nha cả nhà.",
        hashtags: "#instakids #nuoidaycon #reading #parenting #cutestories #baoboihub",
        format: "Carousel 4 ảnh vuông",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện audio cuối tuần cho bé: Chú Gấu Con Tìm Nụ Cười",
        caption: "Kính gửi quý phụ huynh, Bảo Bối Story Hub xin gửi tặng các bé câu chuyện cuối tuần ấm áp về chú Gấu Con tốt bụng. Chúc cả nhà có những phút giây đọc truyện đầm ấm bên nhau.",
        hashtags: "#zalo #baoboi #truyenaudio",
        format: "Bài viết Zalo OA kèm audio",
        aspectRatio: "16:9",
        duration: "3 phút đọc",
        thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 1: Chú Gấu Con Tìm Nụ Cười | Kể Chuyện Đêm Khuya Bảo Bối",
        caption: "Podcast kể chuyện dành cho các bé trước khi đi ngủ. Cùng lắng nghe giọng kể ấm áp và âm nhạc du dương giúp bé thư giãn và chìm sâu vào giấc ngủ an lành.",
        hashtags: "#podcastthieunhi #baoboiradio #chugaucon",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "4:12",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Thư Viện] Gợi ý truyện đọc cuối tuần giúp nuôi dưỡng trí tuệ cảm xúc (EQ) cho bé",
        caption: "Chào bạn, tuần này Bảo Bối gợi ý câu chuyện 'Chú Gấu Con Tìm Nụ Cười' kèm bộ câu hỏi thảo luận giúp khơi gợi suy nghĩ tích cực của bé sau khi đọc...",
        hashtags: "#newsletter #dayconeq #baoboi",
        format: "Email Newsletter",
        aspectRatio: "N/A",
        duration: "5 phút đọc",
        thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-2",
    title: "Bạn Đom Đóm Không Sợ Tối",
    seriesName: "Thiên Nhiên Lấp Lánh",
    ageGroup: "3-8",
    topic: "Lòng dũng cảm",
    mainEmotion: "Đồng cảm",
    skill: "Vượt qua nỗi sợ bóng tối",
    description: "Chú đom đóm nhỏ Đăng Đăng từng rất sợ bóng tối, cho đến khi chú nhận ra ánh sáng lấp lánh của chính mình có thể giúp đỡ các bạn nhỏ khác.",
    longDescription: "Đăng Đăng là một chú đom đóm con nhưng lại vô cùng sợ bóng tối. Cứ mỗi khi mặt trời lặn, chú lại chui vào chiếc lá sen nhắm nghiền mắt lại. Một đêm nọ, chú nghe tiếng khóc của bé Kiến lạc đường trong rừng sâu. Lấy hết dũng khí, Đăng Đăng thắp sáng chiếc bụng nhỏ bé của mình để dẫn đường cho Kiến về nhà. Từ đó, chú không còn sợ tối nữa mà tự hào về ánh sáng ấm áp của mình.",
    storyText: "Trong thung lũng hoa mướp, có một bạn đom đóm tên là Đăng Đăng. Khác với các bạn đom đóm khác thích bay lượn trong đêm, Đăng Đăng lại rất sợ bóng tối. Cứ tối đến là chú trốn dưới kẽ lá. Một hôm, nghe tiếng khóc thút thít dưới gốc cây, Đăng Đăng lấy hết can đảm thắp sáng ngọn đèn nhỏ sau đuôi rồi bay xuống. Hóa ra là Kiến Nhỏ bị lạc đường và sợ hãi. Đăng Đăng bảo: 'Đừng sợ, tớ sẽ thắp sáng đường cho bạn đi'. Đăng Đăng bay trước, soi những tia sáng dịu nhẹ dẫn Kiến Nhỏ về tổ an toàn. Nhìn thấy nụ cười hạnh phúc của Kiến Nhỏ và gia đình, Đăng Đăng nhận ra bóng tối không hề đáng sợ, mà chính bóng tối là nơi ánh sáng của chú lung linh và ích lợi nhất.",
    wordCount: 220,
    pageCount: 3,
    readDuration: 4,
    audioDuration: 5,
    language: "vi",
    author: "Thu Trang",
    illustrator: "Hoàng Giang",
    voiceNarrator: "Cô Hồng Nhung",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Bạn Đom Đóm Không Sợ Tối - Truyện dũng cảm cho bé | Bảo Bối",
    seoDescription: "Truyện ngụ ngôn ý nghĩa cho trẻ mầm non giúp vượt qua nỗi sợ bóng tối và tự tin vào khả năng của bản thân.",
    keywords: ["đom đóm sợ tối", "truyện dũng cảm", "vượt qua sợ bóng tối"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Giúp các bé hiểu rằng sợ hãi là một cảm xúc bình thường, nhưng khi chúng ta hướng sự tập trung vào việc giúp đỡ người khác, lòng dũng cảm sẽ tự động xuất hiện.",
      discussionQuestions: [
        "Tại sao Đăng Đăng lúc đầu lại sợ bóng tối?",
        "Điều gì đã khiến Đăng Đăng quên đi nỗi sợ hãi của mình?",
        "Con có sợ bóng tối không? Sau khi đọc truyện con thấy bóng tối như thế nào?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Trong thung lũng hoa mướp vàng rực, có một chú đom đóm nhỏ tên là Đăng Đăng. Trái ngược với các bạn, Đăng Đăng lại vô cùng sợ bóng tối. Khi hoàng hôn buông xuống, chú thường cuộn tròn trong một chiếc lá lớn, run rẩy lo lắng.",
        illustrationUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Một đêm nọ, Đăng Đăng bỗng nghe thấy tiếng khóc thút thít nhỏ nhoi dưới gốc cây tầm xuân. Lấy hết can đảm, chú chớp chớp chiếc bụng nhỏ. Một ánh sáng vàng dịu nhẹ tỏa ra. Chú bay xuống gần và thấy Kiến Nhỏ đang ngồi khóc vì lạc đường.",
        illustrationUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "'Đừng lo, tớ sẽ thắp sáng đường đi cho bạn!' - Đăng Đăng nói. Chú bay lượn trên cao, rọi sáng lối mòn dẫn Kiến Nhỏ về tổ ấm áp. Từ đó, Đăng Đăng tự hào vì ánh sáng của mình và không còn sợ đêm tối nữa.",
        illustrationUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Bạn Đom Đóm Không Sợ Tối - Bảo Bối Story Hub",
        caption: "Bé sợ tối? Hãy cùng đọc câu chuyện của Đom Đóm Đăng Đăng để thấy đêm tối đáng yêu thế nào nhé.",
        hashtags: "#domdom #sobongtoi #baoboi #truyenamthanh",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "4 phút đọc",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "💡 CON SỢ BÓNG TỐI? CÙNG XEM CÂU CHUYỆN CỦA ĐĂNG ĐĂNG 💡",
        caption: "Nỗi sợ bóng tối là rào cản tâm lý phổ biến của các bé từ 3-8 tuổi. Thay vì ép con, ba mẹ có thể dùng câu chuyện đáng yêu của Đom đóm Đăng Đăng để thủ thỉ cùng con trước giờ đi ngủ.",
        hashtags: "#BaoBoi #NuoiDayCon #TruyenCoTich #VuotQuaNoiSo",
        format: "Link bài viết kèm ảnh minh họa",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Bạn Đom Đóm Không Sợ Tối | Truyện Hay Cho Bé Ngủ Ngon Có Audio Minh Họa",
        caption: "Hành trình vượt qua nỗi sợ của chú Đom Đóm Đăng Đăng sẽ giúp các bé dũng cảm hơn khi ngủ một mình.",
        hashtags: "#vietnamesefairytales #truyenthieunhi #kechuyendaiduong #baoboi",
        format: "Video hoạt họa tĩnh",
        aspectRatio: "16:9",
        duration: "5:30",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Khi Đom Đóm Lại Sợ Bóng Tối? 😂💡 #shorts",
        caption: "Bật mí hành trình dũng cảm của chú đom đóm Đăng Đăng cứu nguy cho bạn Kiến lạc đường trong đêm.",
        hashtags: "#shorts #thieunhi #kechuyen #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:45",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Bí quyết trị chứng sợ tối cho bé siêu hiệu quả 💡✨ #meovat",
        caption: "Một câu chuyện nhỏ có thể thay đổi tư duy của bé về đêm tối. Hãy để Đăng Đăng thắp sáng niềm vui cho con yêu của bạn nhé!",
        hashtags: "#tiktokdaycon #nuoidaycon #meovat #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:50",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Làm thế nào giúp bé vượt qua nỗi sợ bóng tối?",
        caption: "Đọc câu chuyện bạn Đom đóm Đăng Đăng thắp sáng niềm tin giúp con vững tâm hơn trước bóng tối nhé ba mẹ ơi.",
        hashtags: "#kidsbooks #readingtime #parenthood #anxietyforkids #baoboi",
        format: "Carousel 5 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Mẹo nhỏ cho cha mẹ: Giúp con tự lập không sợ bóng tối",
        caption: "Cùng lắng nghe audio truyện 'Bạn Đom Đóm Không Sợ Tối' để làm dịu tâm trí con trước khi ngủ.",
        hashtags: "#zalo #baoboihub #daycon",
        format: "Zalo Message",
        aspectRatio: "16:9",
        duration: "4 phút",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 2: Bạn Đom Đóm Không Sợ Tối | Bảo Bối Kể Bé Nghe",
        caption: "Câu chuyện nhẹ nhàng giúp xoa dịu những nỗi sợ vô cớ của bé vào ban đêm.",
        hashtags: "#podcastthieunhi #chuyenngungon #domdom",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "5:30",
        thumbnail: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối] Cùng Đom Đóm Đăng Đăng thắp sáng lòng dũng cảm trong bé",
        caption: "Bản tin tuần này mang đến câu chuyện giúp xoa dịu sự nhạy cảm của bé đối với bóng tối...",
        hashtags: "#newsletter #baoboi #daycon",
        format: "Email",
        aspectRatio: "N/A",
        duration: "4 phút đọc",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-3",
    title: "Chiếc Áo Ấm Của Mèo Con",
    seriesName: "Gia Đình Ấm Áp",
    ageGroup: "3-8",
    topic: "Gia đình",
    mainEmotion: "Yêu thương",
    skill: "Lòng biết ơn và hiếu thảo",
    description: "Mèo con Mi-mi học được cách trân trọng sự chăm sóc của mẹ khi tự mình đan chiếc khăn len nhỏ tặng mẹ trong ngày đông giá rét.",
    longDescription: "Mèo con Mi-mi thường hay vòi vĩnh và chê bai những chiếc áo len mẹ đan vì nghĩ chúng không đủ đẹp. Một hôm, nhìn thấy những ngón tay của mẹ bị nứt nẻ vì lạnh mà vẫn miệt mài đan áo cho mình, Mi-mi cảm thấy hối hận. Chú âm thầm dùng những sợi len thừa đan thành một chiếc khăn quàng cổ nhỏ vụng về để tặng mẹ. Sự ấm áp của tình yêu thương đã sưởi ấm gia đình mèo con suốt mùa đông dài.",
    storyText: "Mèo con Mi-mi rất thích mặc đẹp, nhưng chú lại thường chê chiếc áo len đỏ mẹ đan là thô ráp. Một chiều đông, Mi-mi thấy mẹ ngồi đan áo dưới ngọn đèn dầu, đôi bàn tay mẹ run run vì rét lạnh nhưng ánh mắt vẫn ngập tràn yêu thương nhìn chú. Mi-mi nhận ra mẹ đã nhường tất cả phần ấm áp nhất cho mình. Lòng ngập tràn hối hận, Mi-mi nhặt những đoạn len vụn màu xanh, màu vàng mà mẹ bỏ lại. Chú tập tành đan một chiếc khăn quàng cổ nhỏ. Dù chiếc khăn có chỗ to chỗ nhỏ chưa đều, nhưng khi quàng vào cổ mẹ vào sáng hôm sau, mẹ Mi-mi đã khóc vì hạnh phúc. Mi-mi ôm mẹ thật chặt: 'Con cảm ơn mẹ, áo len mẹ đan là ấm nhất trên đời!'.",
    wordCount: 200,
    pageCount: 3,
    readDuration: 3,
    audioDuration: 4,
    language: "vi",
    author: "Khánh Linh",
    illustrator: "Thái Mỹ",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Chiếc Áo Ấm Của Mèo Con - Truyện về tình yêu gia đình | Bảo Bối",
    seoDescription: "Một câu chuyện cảm động giáo dục lòng biết ơn và sự hiếu thảo của trẻ nhỏ đối với công ơn sinh thành và chăm sóc của cha mẹ.",
    keywords: ["chiếc áo ấm của mèo con", "truyện gia đình", "biết ơn mẹ"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "approved",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Giáo dục con hiểu được tình yêu vô điều kiện của cha mẹ qua những hành động giản dị thường ngày và khuyến khích con thể hiện lòng biết ơn bằng những việc làm nhỏ phù hợp với lứa tuổi.",
      discussionQuestions: [
        "Vì sao lúc đầu Mi-mi lại không thích chiếc áo len mẹ đan?",
        "Khi thấy mẹ đan áo trong đêm lạnh, Mi-mi đã nghĩ gì và làm gì?",
        "Con có thể làm việc tốt gì để giúp đỡ và thể hiện tình yêu với bố mẹ hôm nay?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Mèo con Mi-mi rất thích mặc đẹp, nhưng chú lại thường nhăn nhó chê chiếc áo len đỏ mẹ tự tay đan là thô ráp và không hợp mốt. Mèo mẹ chỉ mỉm cười xoa đầu chú, ánh mắt đượm buồn.",
        illustrationUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Một buổi tối đông lạnh buốt, Mi-mi giật mình thức giấc và thấy mẹ vẫn ngồi lặng lẽ đan áo dưới ánh đèn vàng nhạt. Đôi tay mẹ run bần bật vì lạnh, nhưng ánh mắt đầy ấm áp vẫn dõi theo đứa con đang ngủ say.",
        illustrationUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Hối hận dâng trào, Mi-mi gom sợi len thừa vụn đan thành chiếc khăn cổ nhỏ. Dù vụng về nhưng chiếc khăn chứa đựng tình yêu của chú. Mẹ Mi-mi đã hạnh phúc ôm chú vào lòng ấm áp.",
        illustrationUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Chiếc Áo Ấm Của Mèo Con - Bảo Bối Story",
        caption: "Câu chuyện cảm động dạy trẻ về lòng hiếu thảo và biết ơn cha mẹ.",
        hashtags: "#meocon #tinhyeugiadinh #baoboi #truyenamthanh",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🐱 BÀI HỌC VỀ LÒNG BIẾT ƠN DÀNH CHO CON YÊU 🐱",
        caption: "Có bao giờ con trẻ vô tình xem nhẹ công sức chăm sóc của cha mẹ? Hãy kể cho con câu chuyện Mèo con Mi-mi để cùng dạy trẻ trân trọng tình yêu thương thiêng liêng của gia đình.",
        hashtags: "#BaoBoi #TinhGiaDinh #NuoiDayEQ #DayConBietOn",
        format: "Hình ảnh kèm link",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Chiếc Áo Ấm Của Mèo Con - Câu Chuyện Gia Đình Cảm Động Nhất Cho Trẻ",
        caption: "Dưới giọng đọc ngọt ngào, câu chuyện này sẽ giúp bé yêu thêm cha mẹ và hiểu hơn những hy sinh lặng thầm trong gia đình.",
        hashtags: "#audiobookvietnam #cotichthieunhi #baoboi #giadinh",
        format: "Video hoạt họa tĩnh",
        aspectRatio: "16:9",
        duration: "4:30",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Mèo con hối hận vì chê áo len mẹ đan 🧶😿 #shorts",
        caption: "Một bài học nhỏ thấm thía về tình mẫu tử thiêng liêng.",
        hashtags: "#shorts #meocon #tinhyeumau tu #baoboi",
        format: "Video ngắn",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Bé sẽ thay đổi sau khi nghe câu chuyện này về gia đình! 🥺🐱 #shorts",
        caption: "Đừng bỏ lỡ câu chuyện giáo dục ý nghĩa dạy trẻ hiếu thảo và thấu hiểu tình yêu của cha mẹ.",
        hashtags: "#dayconthongminh #giaoduceq #meocon #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:55",
        thumbnail: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Chiếc Áo Ấm Của Mèo Con 🧶",
        caption: "Bài học giáo dục con biết ơn công lao cha mẹ từ bé cực sâu sắc.",
        hashtags: "#parentinglife #childrenbook #eqdevelopment #lovefamily",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện audio nuôi dưỡng lòng hiếu thảo cho bé yêu",
        caption: "Cùng lắng nghe câu chuyện đầy tình thương của gia đình Mèo con Mi-mi.",
        hashtags: "#zalo #baoboi #truyenaudio",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 3: Chiếc Áo Ấm Của Mèo Con | Quà Tặng Con Yêu Bảo Bối",
        caption: "Một câu chuyện sưởi ấm tâm hồn bé trong những buổi tối se lạnh.",
        hashtags: "#podcastthieunhi #baoboiradio #tinhgiadinh",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "4:30",
        thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối] Chiếc áo ấm áp nhất mùa đông được dệt từ tình yêu thương",
        caption: "Gửi tặng bạn câu chuyện ý nghĩa giáo dục con hiếu thảo và sẻ chia với gia đình...",
        hashtags: "#newsletter #dayconeq #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-4",
    title: "Ngôi Nhà Chia Sẻ",
    seriesName: "Những Người Bạn Đáng Yêu",
    ageGroup: "3-8",
    topic: "Tình bạn",
    mainEmotion: "Đồng cảm",
    skill: "Học cách chia sẻ và hợp tác",
    description: "Nhà của Thỏ Ngọc bị đổ sau cơn bão, những người bạn rừng xanh đã cùng gom góp gỗ và công sức xây lại ngôi nhà chung rực rỡ sắc màu.",
    longDescription: "Sau một trận giông bão lớn, ngôi nhà bằng nấm của Thỏ Ngọc bị sập hoàn toàn. Thỏ Ngọc ngồi khóc thút thít bên đường. Nghe tin, bạn Sóc mang đến những cành thông chắc chắn, bạn Nhím mang đến những lá cỏ khô lợp mái, bạn Gấu giúp khuân vác thân cây lớn. Mọi người cùng chung tay giúp Thỏ Ngọc dựng một ngôi nhà mới to hơn, đẹp hơn. Từ đó, ngôi nhà trở thành nơi tụ họp chia sẻ niềm vui của cả nhóm bạn.",
    storyText: "Trận bão đêm qua thổi bay mái nhà bằng nấm của Thỏ Ngọc. Thỏ Ngọc buồn bã ôm củ cà rốt khóc thút thít. Bác Gấu đi qua liền xoa đầu thỏ: 'Đừng khóc, bác sẽ giúp cháu dựng nhà mới!'. Rồi chú Sóc nhỏ mang những quả thông khô đến làm gạch trang trí. Bạn Nhím mang lá cọ khô đến lợp mái. Mỗi người một tay, chẳng mấy chốc ngôi nhà mới bằng gỗ thông thơm phức đã hoàn thành. Thỏ Ngọc vui sướng mời tất cả các bạn vào nhà, cùng ăn bánh hạt dẻ và uống trà mật ong. Thỏ Ngọc nhận ra: 'Khi chúng ta chia sẻ khó khăn với nhau, nỗi buồn sẽ biến mất và niềm vui sẽ nhân lên gấp nhiều lần!'.",
    wordCount: 190,
    pageCount: 3,
    readDuration: 3,
    audioDuration: 4,
    language: "vi",
    author: "Thanh Bình",
    illustrator: "Quỳnh Hương",
    voiceNarrator: "Cô Hồng Nhung",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Ngôi Nhà Chia Sẻ - Truyện tình bạn thân thiết | Bảo Bối",
    seoDescription: "Truyện thiếu nhi dạy trẻ tinh thần tương thân tương ái, đoàn kết giúp đỡ bạn bè vượt qua hoàn cảnh khó khăn.",
    keywords: ["ngôi nhà chia sẻ", "đoàn kết giúp đỡ bạn", "truyện tình bạn"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Giúp con hiểu được sức mạnh của sự đoàn kết và ý nghĩa của việc chia sẻ giúp đỡ những người xung quanh khi họ gặp khó khăn.",
      discussionQuestions: [
        "Chuyện gì đã xảy ra với nhà của Thỏ Ngọc?",
        "Các bạn rừng xanh đã giúp đỡ Thỏ Ngọc như thế nào?",
        "Con đã từng giúp đỡ người bạn nào chưa? Cảm xúc lúc đó của con ra sao?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Trận bão đêm qua vô cùng dữ dội, nó đã thổi bay hoàn toàn ngôi nhà bằng nấm nhỏ bé của Thỏ Ngọc. Thỏ Ngọc chỉ biết ôm củ cà rốt ngồi khóc buồn bã bên gốc cây.",
        illustrationUrl: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Nghe tiếng khóc, bác Gấu to lớn, bạn Sóc nhanh nhẹn và Nhím con cùng kéo đến. Bác Gấu cười ấm áp: 'Đừng lo cháu ơi, có mọi người ở đây rồi!'. Cả nhóm cùng bắt tay vào dựng nhà gỗ.",
        illustrationUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Mỗi người một việc, chẳng mấy chốc ngôi nhà mới vững chãi đã dựng xong. Thỏ Ngọc hạnh phúc mở tiệc mời các bạn ăn bánh ngọt. Từ đó, ngôi nhà luôn rộn rã tiếng cười của sự chia sẻ.",
        illustrationUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Ngôi Nhà Chia Sẻ - Câu chuyện đoàn kết cho bé tại Bảo Bối",
        caption: "Câu chuyện dạy trẻ đoàn kết, sẻ chia khó khăn cùng bạn bè.",
        hashtags: "#thongoc #doanket #baoboi #truyenaudio",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🏠 SỨC MẠNH CỦA SỰ ĐOÀN KẾT VÀ CHIA SẺ 🏠",
        caption: "Nhà đổ vì bão, Thỏ Ngọc sẽ làm gì? Bài học về lòng nhân ái, sẵn sàng giúp đỡ bạn bè lúc khó khăn sẽ giúp nuôi dưỡng tâm hồn vị tha của trẻ.",
        hashtags: "#BaoBoi #DayTreNhanAi #GiaoDucThieuNhi #DoanKet",
        format: "Link bài viết kèm ảnh",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Ngôi Nhà Chia Sẻ - Câu Chuyện Ý Nghĩa Về Tình Bạn Và Sự Hợp Tác",
        caption: "Bản audio chất lượng cao giúp bé nghe chuyện thư giãn trước khi đi ngủ, dạy bé biết san sẻ với người khác.",
        hashtags: "#audiobooksforkids #truyentinhban #ruongxanh #baoboi",
        format: "Video hoạt họa tĩnh",
        aspectRatio: "16:9",
        duration: "4:00",
        thumbnail: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Khi cả rừng xanh cùng nhau xây nhà giúp Thỏ Ngọc! 🐰🌲 #shorts",
        caption: "Một tinh thần đồng đội tuyệt vời của những người bạn đáng yêu.",
        hashtags: "#shorts #thongoc #tinhban #ruongxanh #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:52",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Bài học về tình bạn: Cùng nhau xây dựng tương lai tốt đẹp 🐰🤝 #shorts",
        caption: "Thỏ Ngọc may mắn có những người bạn thật tuyệt vời. Ba mẹ cùng giáo dục con học cách chia sẻ nhé!",
        hashtags: "#giadinh #nuoidaycon #tinhbanthan #kynangmem #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Dạy bé bài học chia sẻ từ Ngôi Nhà Thỏ Ngọc 🌸",
        caption: "Mời ba mẹ lướt slide xem hành trình dựng nhà gỗ ngập tràn tình bạn của Thỏ Ngọc nhé.",
        hashtags: "#childrenillustrations #friendshipforever #sharingiscaring #parentinglife",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Kể chuyện bé nghe: Câu chuyện tình bạn 'Ngôi Nhà Chia Sẻ'",
        caption: "Audio hay giúp bé có giấc ngủ sâu và hiểu thêm về sự đoàn kết hợp tác.",
        hashtags: "#zalo #baoboi #truyenthieunhi",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 4: Ngôi Nhà Chia Sẻ | Vườn Cổ Tích Bảo Bối",
        caption: "Những âm thanh thiên nhiên êm dịu hòa quyện cùng bài học ý nghĩa về tình bạn.",
        hashtags: "#podcastforkids #chuyenngungon #tinhban",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "4:00",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối] Dạy trẻ sự thấu cảm và sẻ chia thông qua tinh thần đồng đội",
        caption: "Câu chuyện ngôi nhà chung của Thỏ Ngọc sẽ mang đến những bài học nuôi dạy trẻ sâu sắc...",
        hashtags: "#newsletter #dayconthongminh #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "3 phút",
        thumbnail: "https://images.unsplash.com/photo-1500627869374-13ad99369a7e?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },

  // --- AGE GROUP 9-12 ---
  {
    id: "story-5",
    title: "Mật Mã Của Khu Rừng Cổ Đại",
    seriesName: "Thám Tử Nhí Siêu Phàm",
    ageGroup: "9-12",
    topic: "Khoa học",
    mainEmotion: "Tò mò",
    skill: "Tư duy logic và giải quyết vấn đề",
    description: "Ba người bạn nhỏ sử dụng kiến thức toán học và khoa học tự nhiên để giải các câu đố ẩn giấu, cứu lấy cây cổ thụ ngàn năm tuổi.",
    longDescription: "Nhóm bạn trẻ Lâm, Mai và Nam vô tình tìm thấy một tấm bản đồ cổ trong thư viện trường dẫn đến cây cổ thụ ngàn năm sâu trong rừng quốc gia. Cây cổ thụ đang bị một loại sâu bệnh lạ tấn công làm héo úa. Để tìm ra phương thuốc đặc trị ẩn trong ngôi đền đá cổ, nhóm bạn phải giải các câu đố logic về dãy số Fibonacci, tính đối xứng của thiên nhiên và phản ứng hóa học cơ bản. Bằng trí thông minh và sự đoàn kết, các em đã giải cứu khu rừng thành công.",
    storyText: "Lâm nhặt được một tờ giấy da dê úa vàng kẹp trong cuốn sách khoa học cũ. Trên đó ghi: 'Ai muốn tìm nguồn nước cứu Cây Mẹ, hãy giải mật mã dưới chân tháp đá'. Lâm cùng Mai và Nam lập tức lên đường. Câu đố thứ nhất là một dãy số khuyết: '1, 1, 2, 3, 5, 8, ?, 21'. Mai nhanh trí reo lên: 'Đây là dãy Fibonacci! Số tiếp theo là 8 + 5 = 13!'. Cửa đá mở ra, hiện ra một căn phòng chứa đầy các mẫu khoáng chất. Câu đố tiếp theo yêu cầu phân biệt muối và đường bằng tính chất hóa học mà không được nếm. Nam nhớ lại bài học trên lớp: 'Đường khi đun nóng sẽ cháy sém thành màu đen và có mùi thơm ngọt, còn muối thì không!'. Nhờ áp dụng khoa học và tư duy logic nhạy bén, các bạn nhỏ đã tìm ra đúng ống nước ngầm tinh khiết để tưới mát dòng nhựa sống cho Cây Mẹ vĩ đại.",
    wordCount: 350,
    pageCount: 3,
    readDuration: 5,
    audioDuration: 6,
    language: "vi",
    author: "Quốc Anh",
    illustrator: "Minh Quân",
    voiceNarrator: "Anh Minh Triết",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Mật Mã Của Khu Rừng Cổ Đại - Truyện tư duy logic cho học sinh | Bảo Bối",
    seoDescription: "Truyện phiêu lưu kịch tính kết hợp các kiến thức toán học và khoa học thực tiễn giúp kích thích đam mê học hỏi của trẻ 9-12 tuổi.",
    keywords: ["mật mã rừng cổ đại", "truyện tư duy toán học", "khoa học cho bé"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Kích thích niềm say mê học tập và áp dụng kiến thức trường lớp (như toán học, hóa học) vào thực tế cuộc sống thông qua cốt truyện phiêu lưu lôi cuốn.",
      discussionQuestions: [
        "Lâm, Mai và Nam đã gặp những thử thách nào trên đường đi?",
        "Con có biết dãy số Fibonacci là gì không? Nó xuất hiện ở đâu trong tự nhiên (như cánh hoa, quả thông)?",
        "Khoa học đã giúp ích thế nào cho việc giải quyết các vấn đề trong thực tế?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Trong một buổi dọn dẹp thư viện trường, Lâm tìm thấy tấm bản đồ cổ bị kẹp giữa trang sách khoa học tự nhiên. Bản đồ chỉ lối vào ngôi đền cổ nơi ẩn giấu thuốc cứu Cây Cổ Thụ nghìn năm đang héo úa.",
        illustrationUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Mai và Nam gia nhập hành trình. Tại cổng đền, họ đối mặt thử thách thứ nhất: Một bức tường khắc dãy số kỳ lạ '1, 1, 2, 3, 5, 8, ?, 21'. Mai nhận ra quy luật cộng dồn Fibonacci và nhấn vào ô số 13. Cửa mở!",
        illustrationUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Thử thách cuối yêu cầu lọc dung dịch nuôi dưỡng cây bằng bình chưng cất tự chế. Nhờ sự am hiểu vật lý của Nam và sự cẩn thận của Lâm, nhóm bạn tạo ra nguồn nước hồi sinh thành công cho Cây Cổ Thụ.",
        illustrationUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Mật Mã Của Khu Rừng Cổ Đại - Đọc truyện khoa học lý thú",
        caption: "Cùng khám phá câu đố Fibonacci và bài học khoa học qua chuyến phiêu lưu kỳ thú của nhóm bạn trẻ.",
        hashtags: "#khoahoc #fibonacci #tuduylogic #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🔍 GIẢI MÃ KHOA HỌC: CHUYẾN PHIÊU LƯU VÀO RỪNG CỔ ĐẠI 🔍",
        caption: "Bé nhà bạn có yêu thích toán học hay các thí nghiệm khoa học không? 'Mật Mã Của Khu Rừng Cổ Đại' là cuốn truyện lý tưởng kích thích óc tò mò của học sinh tiểu học và trung học cơ sở.",
        hashtags: "#BaoBoiStory #KhoaHọcChoTrẻ #ToánHọcThựcTế #TưDuyLogic #PhiêuLưu",
        format: "Bài viết đính kèm hình ảnh",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Mật Mã Khu Rừng Cổ Đại | Truyện Trinh Thám Khoa Học Cho Trẻ 9-12 Tuổi",
        caption: "Học toán và khoa học chưa bao giờ thú vị đến thế! Hãy cùng ba thám tử nhí giải mã bí mật để cứu lấy cây mẹ nghìn năm tuổi.",
        hashtags: "#trinhthamnhisieupham #stemforkids #hoctoantuvi #baoboi",
        format: "Video ngang hoạt ảnh sống động",
        aspectRatio: "16:9",
        duration: "6:45",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Mật mã Fibonacci cứu lấy cả khu rừng! 🧬🌲 #shorts",
        caption: "Bạn có giải được câu đố tiếp theo cùng nhóm bạn thám tử nhí không?",
        hashtags: "#shorts #thongminh #toanhoc #stem #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:59",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Thử thách giải đố toán học cực xoắn não cùng thám tử nhí 🧠 #toanhoc",
        caption: "Toán học Fibonacci trong tự nhiên kỳ diệu hơn bạn nghĩ nhiều. Hãy rèn tư duy cho con cùng Bảo Bối nhé!",
        hashtags: "#tiktoktoanhoc #stemvietnam #hocsinhthongminh #kynangsong #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:55",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Toán Học Và Tự Nhiên Có Liên Quan Gì? 🧬",
        caption: "Khám phá quy luật Fibonacci đầy bất ngờ qua chuyến phiêu lưu giải mã cứu rừng cổ đại nhé.",
        hashtags: "#stemeducation #mathisfun #detectivekids #naturelovers #baoboi",
        format: "Carousel 5 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Gợi ý truyện giáo dục STEM: Mật Mã Khu Rừng Cổ Đại",
        caption: "Phương pháp học lồng ghép truyện kể đầy lý thú giúp trẻ nhớ lâu và phát triển trí thông minh logic.",
        hashtags: "#zalo #baoboi #stem #truyendaoduc",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 5: Mật Mã Khu Rừng Cổ Đại | Thám Tử Nhí Radio",
        caption: "Bản audio phiêu lưu gay cấn đồng hành cùng những tò mò khám phá thế giới của trẻ.",
        hashtags: "#podcaststem #truyenthieunhivn #hoctap",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "6:45",
        thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối STEM] Đánh thức tư duy giải quyết vấn đề của trẻ qua truyện kể phiêu lưu",
        caption: "Làm thế nào để trẻ yêu thích môn Toán và Khoa học tự nhiên một cách tự nhiên nhất? Hãy bắt đầu bằng những câu chuyện giải đố...",
        hashtags: "#newsletter #dayconstem #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-6",
    title: "Tiếng Hát Từ Rạn San Hô",
    seriesName: "Đại Dương Xanh Thẳm",
    ageGroup: "9-12",
    topic: "Môi trường",
    mainEmotion: "Đồng cảm",
    skill: "Bảo vệ môi trường và đa dạng sinh học",
    description: "Nhìn thấy ngôi nhà rạn san hô quê hương bị bạc màu vì rác thải nhựa, cô cá hề Ly-ly dũng cảm cùng các bạn mở chiến dịch dọn sạch biển khơi.",
    longDescription: "Ly-ly là một cô cá hề tinh nghịch sống tại rạn san hô rực rỡ sắc màu. Tuy nhiên, thời gian gần đây, dòng nước ấm lên và rác thải nhựa từ đất liền tràn xuống khiến rạn san hô bị mất đi màu sắc vốn có và chuyển sang một màu trắng xóa u buồn. Nhận ra sự nguy hiểm của hiện tượng san hô bạc màu đối với toàn bộ sinh vật biển, Ly-ly đã tập hợp rùa biển, bạch tuộc và các đàn cá nhỏ cùng nhau gom rác, giải cứu những sinh vật bị mắc kẹt, trả lại vẻ đẹp tươi xanh cho đại dương xanh thẳm.",
    storyText: "Rạn san hô rực rỡ nơi Ly-ly sinh sống bỗng dưng chuyển sang màu trắng bệch u sầu. Những rác thải túi nilon, chai nhựa trôi nổi quấn quanh những cành san hô xinh đẹp khiến các sinh vật không thể thở nổi. Bác Rùa Biển thở dài: 'Cứ đà này rạn san hô sẽ chết mất thôi'. Cá hề Ly-ly lập tức lên tiếng: 'Chúng ta không thể ngồi chờ được! Hãy cùng hành động thôi!'. Ly-ly cùng các bạn lập ra 'Đội Cứu Hộ Đại Dương'. Bạch tuộc dùng những xúc tu linh hoạt để gom chai nhựa, rùa biển dọn lưới đánh cá cũ, cá hề kêu gọi các đàn cá nhỏ đẩy các túi nilon vào khu vực rác tập trung để dòng nước cuốn đi. Trải qua những ngày làm việc vất vả, rạn san hô đã dần hồi sinh, những dòng hải lưu tươi mát quay trở lại. Tiếng hát vui tươi của cư dân biển khơi lại vang vọng rực rỡ.",
    wordCount: 320,
    pageCount: 3,
    readDuration: 5,
    audioDuration: 6,
    language: "vi",
    author: "Mỹ Hạnh",
    illustrator: "Linh Chi",
    voiceNarrator: "Cô Hồng Nhung",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Tiếng Hát Từ Rạn San Hô - Truyện bảo vệ đại dương | Bảo Bối",
    seoDescription: "Truyện thiếu nhi giáo dục ý thức bảo vệ môi trường, giải thích hiện tượng san hô bạc màu một cách dễ hiểu cho trẻ em 9-12 tuổi.",
    keywords: ["tiếng hát rạn san hô", "truyện bảo vệ môi trường", "rác thải nhựa đại dương"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Nâng cao nhận thức bảo vệ môi trường biển, hạn chế sử dụng túi nilon và đồ nhựa một lần. Giải thích về vai trò cực kỳ quan trọng của san hô đối với sự sống dưới đại dương.",
      discussionQuestions: [
        "Tại sao rạn san hô xinh đẹp lại bị chuyển sang màu trắng bạc u sầu?",
        "Cá hề Ly-ly cùng các bạn biển đã làm những gì để cứu rạn san hô?",
        "Ở nhà hoặc trường học, con có thể làm gì để hạn chế rác thải nhựa bảo vệ môi trường?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Cá Hề Ly-ly sống vui vẻ tại rạn san hô đầy màu sắc. Nhưng dạo gần đây, rác thải nhựa từ sông ngòi đổ ra đã bao trùm lấy ngôi nhà của chú. Cảnh vật dần bạc màu trắng xóa, mất đi sinh khí.",
        illustrationUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Không cam chịu nhìn quê hương bị hủy hoại, Ly-ly thành lập 'Biệt Đội Xanh Biển Cả'. Bác Rùa dùng mai đẩy rác lớn, Bạch Tuộc vớt lưới kéo, còn Ly-ly kêu gọi các đàn cá nhỏ dọn nilon trôi nổi.",
        illustrationUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Sau nhiều tuần nỗ lực không ngừng nghỉ, rác nhựa đã được dọn sạch, san hô bắt đầu lấy lại màu sắc rực rỡ ban đầu. Những loài cá nhỏ lại kéo về ca hát vui tươi.",
        illustrationUrl: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Tiếng Hát Từ Rạn San Hô - Bảo Bối Story Hub",
        caption: "Bé học cách bảo vệ môi trường biển xanh qua cuộc chiến chống rác thải nhựa của cá hề Ly-ly.",
        hashtags: "#baovemoitruong #racthainhua #daiduongxanh #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🌊 BẢO VỆ ĐẠI DƯƠNG XANH CÙNG BIỆT ĐỘI CÁ HỀ 🌊",
        caption: "Mỗi năm có hàng triệu tấn rác thải nhựa đổ ra đại dương. Hãy cùng bé đọc truyện 'Tiếng Hát Từ Rạn San Hô' để nuôi dưỡng ý thức bảo vệ môi trường, hạn chế rác thải nhựa ngay hôm nay nhé!",
        hashtags: "#BaoBoiEco #SốngXanh #BảoVệMôiTrường #DạyConTựLập #ĐạiDương",
        format: "Bài viết kèm hình ảnh xanh",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Tiếng Hát Từ Rạn San Hô | Truyện Giáo Dục Môi Trường Cực Hay Cho Trẻ",
        caption: "Câu chuyện chân thực giải thích hiện tượng san hô tẩy trắng và lời kêu gọi chung tay dọn rác bảo vệ biển cả của các loài sinh vật biển.",
        hashtags: "#truyenmoitruong #audiothieunhi #saveourseas #baoboi",
        format: "Video hoạt ảnh biển cả sinh động",
        aspectRatio: "16:9",
        duration: "6:15",
        thumbnail: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Sự thật đáng sợ đằng sau rạn san hô bị tẩy trắng! 😢🌊 #shorts",
        caption: "Cá hề Ly-ly cùng cư dân biển đã làm gì để đẩy lùi hiểm họa rác thải nhựa?",
        hashtags: "#shorts #environment #savetheocean #climatechange #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:55",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Cứu rạn san hô khỏi rác thải nhựa cùng cá hề Ly-ly 🐠🗑️ #khoahoc",
        caption: "Những hành động nhỏ cứu lấy đại dương lớn. Dạy con yêu thiên nhiên chưa bao giờ dễ dàng hơn với Bảo Bối.",
        hashtags: "#truyenmoitruong #stemvietnam #moitruongxanh #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:50",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Rạn San Hô Đang Kêu Cứu! 🐳",
        caption: "Hành trình giải cứu san hô khỏi thảm họa túi nilon của biệt đội biển xanh.",
        hashtags: "#savetheplanet #marinelife #ecofriendlykids #plasticfree #baoboi",
        format: "Carousel 5 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Giáo dục ý thức sống xanh cho con từ câu chuyện 'Tiếng Hát Từ Rạn San Hô'",
        caption: "Bản tin Zalo OA chia sẻ file nghe audio chất lượng cao cho bé trước giờ ngủ.",
        hashtags: "#zalo #baoboi #songxanh #truyenthieunhi",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 6: Tiếng Hát Từ Rạn San Hô | Radio Xanh Bảo Bối",
        caption: "Lắng nghe thanh âm dịu mát của biển cả kết hợp thông điệp gìn giữ môi trường sống trong lành.",
        hashtags: "#podcastthieunhi #saveocean #moitruong",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "6:15",
        thumbnail: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Sống Xanh] Để con làm bạn với đại dương và rèn luyện ý thức bảo vệ trái đất",
        caption: "Làm thế nào để xây dựng thói quen phân loại rác thải cho con trẻ? Cùng đọc câu chuyện của cá hề Ly-ly...",
        hashtags: "#newsletter #dayconmoitruong #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-7",
    title: "Vương Quốc Quả Thông",
    seriesName: "Lịch Sử Kỳ Thú",
    ageGroup: "9-12",
    topic: "Kỹ năng sống",
    mainEmotion: "Đồng cảm",
    skill: "Tôn trọng sự khác biệt",
    description: "Câu chuyện ngụ ngôn sâu sắc về hai tộc sóc đỏ và sóc xám học cách hòa hợp, chia sẻ lãnh thổ thông qua giao thương công bằng.",
    longDescription: "Từ xưa, vương quốc sóc đỏ ở phía Đông sông và sóc xám ở phía Tây sông luôn tranh chấp nguồn quả thông dồi dào trên hòn đảo giữa sông. Họ luôn xem đối phương là xấu xí và tham lam. Một ngày, cây cầu gỗ duy nhất bị gãy trong lũ lớn, cô sóc đỏ ly-ly và cậu sóc xám pi-pi cùng bị kẹt trên đảo. Qua trò chuyện, hai bạn nhận ra những nét độc đáo và tính cách tốt lành của nhau. Hai bạn đề xuất mô hình giao thương đổi lấy quả thông khô của sóc đỏ lấy nấm hương sấy của sóc xám, hóa giải thù hận nghìn năm của hai bộ tộc.",
    storyText: "Tộc sóc đỏ sống ở bìa rừng thông vàng rực, còn tộc sóc xám định cư trong thung lũng sồi râm mát. Giữa họ là dòng sông cuồn cuộn và hòn đảo Quả Thông tranh chấp dai dẳng. Hai tộc luôn đồn thổi những điều xấu về nhau. Một ngày bão lũ, cầu treo gãy, Sóc Đỏ Ly-ly và Sóc Xám Pi-pi cùng bị mắc kẹt trên đảo hoang. Ban đầu họ dè chừng nhau. Đêm lạnh buốt, Pi-pi thấy Ly-ly run rẩy liền chia sẻ chăn lá khô ấm áp. Đáp lại, Ly-ly nướng hạt thông thơm phức mời Pi-pi cùng ăn. Cả hai tâm sự và nhận ra sóc đỏ rất khéo tay đan lát, còn sóc xám rất giỏi tìm nấm quý. Khi lũ rút, hai bạn đề xuất mở 'Chợ Giao Thương Hữu Nghị'. Sự trao đổi công bằng đã giúp xóa bỏ định kiến xưa cũ, biến hòn đảo tranh chấp thành Vương quốc Quả Thông hạnh phúc chung của cả hai tộc sóc.",
    wordCount: 380,
    pageCount: 3,
    readDuration: 6,
    audioDuration: 7,
    language: "vi",
    author: "Gia Bảo",
    illustrator: "Thanh Trúc",
    voiceNarrator: "Anh Minh Triết",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Vương Quốc Quả Thông - Truyện tôn trọng sự khác biệt | Bảo Bối",
    seoDescription: "Truyện ngụ ngôn ý nghĩa dạy trẻ 9-12 tuổi biết thấu hiểu, dẹp bỏ định kiến và tôn trọng sự khác biệt của những người xung quanh.",
    keywords: ["vương quốc quả thông", "tôn trọng sự khác biệt", "truyện sóc đỏ sóc xám"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "approved",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Khơi gợi lòng bao dung, thấu hiểu người khác và dạy trẻ cách giải quyết xung đột bằng đàm phán hợp tác thay vì định kiến bạo lực.",
      discussionQuestions: [
        "Tại sao hai tộc sóc đỏ và sóc xám lại ghét nhau lúc ban đầu?",
        "Ly-ly và Pi-pi đã làm cách nào để hiểu nhau hơn khi bị kẹt trên đảo?",
        "Trong lớp con, có bạn nào có tính cách hay sở thích khác biệt với con không? Con sẽ làm gì để làm bạn với họ?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Tộc sóc đỏ ở bìa rừng thông và tộc sóc xám ở rừng sồi luôn coi nhau là kẻ thù. Họ tranh giành hòn đảo Quả Thông trù phú ở giữa sông và đồn thổi những thông tin xấu xí về đối phương.",
        illustrationUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Một đợt lũ lớn phá hỏng cầu. Sóc Đỏ Ly-ly và Sóc Xám Pi-pi cùng kẹt lại đảo hoang. Trải qua đêm lạnh, họ chia nhau cái ôm ấm áp và những hạt quả thông nướng thơm ngon, nhận ra đối phương vô cùng tử tế.",
        illustrationUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Họ đề xuất mô hình giao thương bình đẳng: Sóc đỏ đổi quả thông lấy nấm sấy của sóc xám. Sự hòa hợp thương mại đã dập tắt tranh chấp, biến nơi đây thành 'Vương quốc Quả Thông' hòa bình.",
        illustrationUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Vương Quốc Quả Thông - Bài học tôn trọng sự khác biệt tại Bảo Bối",
        caption: "Câu chuyện hóa giải thù hận nghìn năm của hai tộc sóc bằng đàm phán thương lượng.",
        hashtags: "#socdo #socxam #tontrongkhacbiet #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🐿️ DẠY CON TÔN TRỌNG SỰ KHÁC BIỆT QUA CÂU CHUYỆN NGỤ NGÔN 🐿️",
        caption: "Định kiến là bức tường ngăn cách tình bạn. Hãy cùng bé đọc câu chuyện 'Vương Quốc Quả Thông' để giúp con hiểu rằng mỗi người đều có những điểm độc đáo riêng đáng quý.",
        hashtags: "#BaoBoi #DạyConBaoDung #TránhĐịnhKiến #HòaNhập #TâmLýTrẻEm",
        format: "Bài viết đính kèm hình ảnh sắc màu",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Vương Quốc Quả Thông | Truyện Ngụ Ngôn Tình Bạn Cho Học Sinh Tiểu Học",
        caption: "Audiobook kể về hai chú sóc thông minh đã xóa bỏ mâu thuẫn dòng họ bằng sự đồng cảm và trao đổi hợp tác.",
        hashtags: "#audiotruyentranh #truyensockhong #baoboi #ngungon",
        format: "Video hoạt họa phong cách màu nước",
        aspectRatio: "16:9",
        duration: "7:20",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Sóc Đỏ vs Sóc Xám: Ai mới là chủ nhân hòn đảo? 🐿️⚔️ #shorts",
        caption: "Màn hóa giải thù hận cực thông minh bằng nấm hương và quả thông nướng.",
        hashtags: "#shorts #dudo #socnga #tinhban #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Học cách đàm phán hợp tác thay vì tranh cãi từ chú sóc nhỏ 🐿️🤝 #shorts",
        caption: "Xóa bỏ định kiến cùng Bảo Bối Story Hub. Ba mẹ xem ngay nhé!",
        hashtags: "#tiktokdaycon #kynanggiaotiep #giadinhviet #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:56",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Xóa Bỏ Định Kiến Từ Bé 🌸",
        caption: "Cùng sóc đỏ Ly-ly học cách tôn trọng điểm mạnh của người khác.",
        hashtags: "#kidsdevelopment #antibullying #respecteachother #peaceforkids #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện kể rèn luyện trí tuệ xã hội (SQ) cho bé: Vương Quốc Quả Thông",
        caption: "Bài học quý báu về sự giao thương, thấu hiểu xã hội cho trẻ.",
        hashtags: "#zalo #baoboi #sq #kynangxahoi",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 7: Vương Quốc Quả Thông | Radio Kỹ Năng Bảo Bối",
        caption: "Câu chuyện rèn luyện trí tuệ xã hội tuyệt vời dưới giọng đọc ấm áp.",
        hashtags: "#podcastforkids #baoboiradio #tontrongkhacbiet",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "7:20",
        thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Kỹ Năng] Giúp con xây dựng tư duy win-win để hội nhập tương lai",
        caption: "Tư duy cùng thắng (win-win) có thể được nuôi dưỡng từ những truyện ngụ ngôn đơn giản như thế nào...",
        hashtags: "#newsletter #dayconeq #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-8",
    title: "Chú Rồng Thích Đọc Sách",
    seriesName: "Thung Lũng Mơ Mộng",
    ageGroup: "9-12",
    topic: "Giáo dục",
    mainEmotion: "Nhẹ nhàng",
    skill: "Khơi dậy niềm đam mê học hỏi",
    description: "Một chú rồng nhỏ thích đọc sách khoa học hơn là phun lửa, đã dùng kiến thức của mình để giúp dân làng giải cứu nguồn nước nóng.",
    longDescription: "Tại thung lũng rồng lửa, các chú rồng con đều tập luyện phun lửa dữ dội để chuẩn bị cho kỳ thi chiến binh. Duy chỉ có rồng nhỏ A-lô lại say mê đọc sách khoa học địa chất trong hang đá cổ. Các bạn rồng chê cười A-lô là kẻ yếu đuối. Một ngày, mạch suối nguồn duy nhất sưởi ấm thung lũng bị tắc nghẽn do bùn đá sạt lở dữ dội. Trong khi các chú rồng phun lửa cuồng nhiệt vào dòng bùn vô ích, A-lô đã dùng kiến thức địa chất, xác định điểm nghẽn áp suất và tạo ra một lực đẩy đòn bẩy thông minh bằng đá để khai thông dòng suối, mang lại nguồn ấm cho quê hương.",
    storyText: "A-lô là chú rồng nhỏ sống ở Thung lũng Rồng Lửa. Khi các bạn tập luyện phun lửa thiêu đốt cây cỏ, A-lô lại thích trốn vào thư viện đá đọc sách địa chất và thiên văn học. Mọi người bảo A-lô là chú rồng kỳ quặc. Cho đến một mùa đông, mạch nước sưởi ấm duy nhất của thung lũng bị sạt lở đá chặn lại, đóng băng lạnh buốt. Các đấu sĩ rồng mạnh mẽ phun lửa liên tục hòng làm tan đá nhưng vô ích, bùn đất càng nén chặt hơn. A-lô bước ra, chú giở cuốn sách địa chất, đo đạc kỹ lưỡng vết nứt đá. A-lô chỉ ra: 'Không thể dùng nhiệt để đốt bùn khô, ta phải dùng đòn bẩy đá tạo áp suất ở điểm yếu này!'. Chú hướng dẫn các bạn đẩy một tảng đá nhọn vào vị trí đòn bẩy. Đúng như tính toán của A-lô, tảng đá chặn sạt xuống lập tức khơi thông dòng nước ấm trào ra cuồn cuộn. Cả thung lũng reo hò, tôn vinh trí tuệ từ những trang sách của chú rồng nhỏ A-lô tốt bụng.",
    wordCount: 360,
    pageCount: 3,
    readDuration: 5,
    audioDuration: 6,
    language: "vi",
    author: "Bích Vân",
    illustrator: "Đăng Khoa",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Chú Rồng Thích Đọc Sách - Truyện truyền cảm hứng học hỏi | Bảo Bối",
    seoDescription: "Truyện cổ tích hiện đại khuyến khích học sinh yêu thích việc đọc sách, khám phá khoa học thay vì chạy theo những trào lưu sáo rỗng.",
    keywords: ["chú rồng đọc sách", "truyền cảm hứng đọc sách", "đọc sách khoa học"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Dạy trẻ hiểu được tầm quan trọng của tri thức và đọc sách. Khuyến khích trẻ theo đuổi sở thích và tài năng riêng của mình dù có khác biệt với số đông.",
      discussionQuestions: [
        "Tại sao các chú rồng khác lại coi A-lô là kỳ quặc?",
        "Kiến thức trong sách đã giúp A-lô giải quyết bài toán mạch nước tắc nghẽn như thế nào?",
        "Con yêu thích cuốn sách nào nhất? Cuốn sách đó đã dạy con điều gì bổ ích?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Ở Thung lũng Rồng Lửa, trong khi tất cả rồng con đều luyện tập phun lửa nóng rực thì A-lô lại trốn trong thư viện để nghiền ngẫm những cuốn sách khoa học cổ. Các bạn rồng thường chê cười chú.",
        illustrationUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Mùa đông buốt giá tràn về, mạch suối sưởi ấm thung lũng bị sạt lở đất đá bít chặt. Các chú rồng chiến binh phun lửa rực trời nhưng chỉ làm đất bùn nén chặt thêm. Thung lũng đứng trước nguy cơ đóng băng.",
        illustrationUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "A-lô đo đạc lực ép địa chất trên trang sách cũ và hướng dẫn các bạn chế tạo đòn bẩy bằng đá. Nhờ tính toán điểm tựa chính xác, tảng đá sạt lở bị hất tung, khơi thông dòng nước ấm áp cứu thung lũng.",
        illustrationUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Chú Rồng Thích Đọc Sách - Rèn luyện thói quen đọc sách cho bé",
        caption: "Tri thức đánh bại sức mạnh cơ bắp. Đọc truyện chú rồng A-lô dũng cảm giải cứu quê hương tại Bảo Bối.",
        hashtags: "#dragons #readbooks #kynangdoc #giao-duc #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "📚 TRI THỨC LÀ SỨC MẠNH: CHÚ RỒNG CON KHÁC BIỆT 📚",
        caption: "Bé nhà bạn lười đọc sách? Hãy để câu chuyện chú Rồng A-lô đáng yêu truyền cảm hứng đọc sách và tự lập cho con nhé. Sách không chỉ là lý thuyết, sách giúp giải quyết những thử thách đời thực!",
        hashtags: "#BaoBoi #ĐamMêĐọcSách #NuôiConThôngMinh #KiếnThứcThựcTế #RồngCon",
        format: "Link bài viết kèm ảnh",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Chú Rồng Thích Đọc Sách | Truyện Cổ Tích Hiện Đại Nuôi Dưỡng Tình Yêu Tri Thức",
        caption: "Lắng nghe câu chuyện lý thú về chú rồng A-lô dùng kiến thức địa chất để giải cứu bộ tộc của mình.",
        hashtags: "#audiotruyencotich #ranguyen #kynangdoctruyen #baoboi",
        format: "Video hoạt họa tĩnh",
        aspectRatio: "16:9",
        duration: "6:00",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Rồng con bị chê vì thích đọc sách địa chất hơn phun lửa! 🐉📖 #shorts",
        caption: "Nhưng chính cuốn sách đó lại cứu nguy cho cả thung lũng lúc nguy cấp.",
        hashtags: "#shorts #rongcon #readingbooks #sciencekids #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:56",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Khi mọt sách trở thành người hùng giải cứu thung lũng rồng! 🐉🧠 #shorts",
        caption: "Nuôi dưỡng ước mơ và cá tính riêng của trẻ cùng Bảo Bối Story Hub nhé ba mẹ ơi.",
        hashtags: "#giadinh #nuoidaycon #triethoc #kynangdoc #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Đọc Sách Thay Vì Phun Lửa? 🐉📖",
        caption: "Câu chuyện dễ thương khuyến khích trẻ tự tin vào trí tuệ của mình.",
        hashtags: "#readingissexy #dragonstory #intelligence #curiousmind #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện audio nuôi dưỡng ước mơ: Chú Rồng Thích Đọc Sách",
        caption: "Phương pháp tạo động lực đọc sách tự nhiên cho học sinh trung học.",
        hashtags: "#zalo #baoboi #docsach #damme",
        format: "Zalo Message",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 8: Chú Rồng Thích Đọc Sách | Radio Tri Thức Bảo Bối",
        caption: "Một câu chuyện vui vẻ kích thích tinh thần tự học và khám phá tri thức của trẻ.",
        hashtags: "#podcastforkids #sachtrongtuonglai #baoboi",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "6:00",
        thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Sách] Để tri thức dẫn lối ước mơ của con trẻ",
        caption: "Bản tin chia sẻ mẹo nhỏ giúp xây dựng góc đọc sách kích thích tư duy cho trẻ...",
        hashtags: "#newsletter #dayconeq #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },

  // --- AGE GROUP 12-15 ---
  {
    id: "story-9",
    title: "Tiếng Vang Từ Đảo Trầm Hương",
    seriesName: "Trưởng Thành Và Thử Thách",
    ageGroup: "12-15",
    topic: "Văn hóa",
    mainEmotion: "Đồng cảm",
    skill: "Tìm kiếm bản sắc cá nhân và sự thấu cảm",
    description: "Một cậu bé thành phố về quê nội trên đảo Trầm Hương, vượt qua khoảng cách thế hệ để học cách chưng cất tinh dầu truyền thống.",
    longDescription: "Duy, một thiếu niên 14 tuổi nghiện game và nhịp sống đô thị, bị bố mẹ ép về quê nội trên đảo Trầm Hương tĩnh lặng suốt mùa hè. Duy cảm thấy vô cùng tẻ nhạt và khó chịu với nếp sống thầm lặng, nghiêm khắc của ông nội - một nghệ nhân chưng cất trầm hương cổ truyền. Qua những ngày cùng ông đi rừng nhặt gỗ trầm khô và học cách canh lửa lò lò luyện tinh dầu tỉ mỉ, Duy dần hiểu ra câu chuyện lịch sử hào hùng của đảo và những mất mát lặng thầm ông nội đã trải qua để gìn giữ di sản văn hóa tổ tiên.",
    storyText: "Duy đá mạnh vỏ lon coca rỗng vào bụi chuối, bực bội nhìn màn hình điện thoại hoàn toàn mất sóng. Hòn đảo Trầm Hương này đối với cậu chẳng khác nào một nhà tù không internet. Ông nội Duy bước ra hiên nhà, chắp tay sau lưng trầm ngâm: 'Muốn có mùi trầm thơm thanh khiết, gỗ phải trải qua những năm tháng chịu vết thương rỉ nhựa trong giông bão'. Sáng hôm sau, Duy bị gọi dậy từ 5 giờ sáng để theo ông lên núi. Ông nội chậm rãi chỉ cho cậu những thân cây gió bầu gầy guộc tích tụ linh khí của đất trời. Suốt một tuần sau đó, Duy phụ trách canh giữ ngọn lửa lò chưng cất. Nhìn ông nội nâng niu từng giọt tinh dầu màu hổ phách lấp lánh như báu vật, Duy cảm thấy ngượng ngùng vì thái độ hời hợt trước đây của mình. Hương trầm dịu nhẹ bay lên, mang theo tiếng vang của ký ức thế hệ trước hòa quyện vào tâm hồn cởi mở mới mẻ của cậu thiếu niên trẻ tuổi.",
    wordCount: 450,
    pageCount: 3,
    readDuration: 6,
    audioDuration: 8,
    language: "vi",
    author: "Minh Tâm",
    illustrator: "Hoàng Giang",
    voiceNarrator: "Anh Minh Triết",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Tiếng Vang Từ Đảo Trầm Hương - Truyện trưởng thành cho teen | Bảo Bối",
    seoDescription: "Truyện ngắn sâu lắng về tình cảm gia đình, khoảng cách thế hệ và quá trình tự nhận thức bản thân của lứa tuổi thiếu niên 12-15 tuổi.",
    keywords: ["đảo trầm hương", "truyện tuổi teen 12-15", "khoảng cách thế hệ"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Thấu hiểu tâm lý nổi loạn của tuổi teen khi đối diện với nếp sống truyền thống. Khuyến khích trẻ lắng nghe câu chuyện của thế hệ trước để tìm thấy mối dây liên kết gia đình vững chắc.",
      discussionQuestions: [
        "Tại sao Duy lúc đầu lại cảm thấy chán ghét hòn đảo và nếp sống của ông nội?",
        "Lời nói của ông nội về 'vết thương rỉ nhựa' của cây gió bầu ẩn chứa bài học gì về sự trưởng thành?",
        "Có bao giờ con trò chuyện sâu sắc với ông bà mình chưa? Con muốn biết thêm điều gì về quá khứ của gia đình?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Duy, 14 tuổi, bị tịch thu điện thoại và gửi về quê nội biệt lập trên Đảo Trầm Hương. Cậu thiếu niên thành phố vô cùng bực bội với nếp sinh hoạt tĩnh lặng, tẻ nhạt của người ông nội nghệ nhân.",
        illustrationUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Theo chân ông lên núi săn tìm những mẩu gỗ trầm khô rỉ nhựa, Duy bắt đầu chứng kiến sự kỳ công của quá trình tạo trầm từ những tổn thương sâu sắc của thân cây gió bầu trong bão tố.",
        illustrationUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Những đêm cùng ông ngồi trông ngọn lửa chưng cất tinh dầu thơm nồng nàn, Duy thấu hiểu lòng say nghề và những hy sinh của ông nội để gìn giữ văn hóa quê hương, xóa nhòa khoảng cách thế hệ.",
        illustrationUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Tiếng Vang Từ Đảo Trầm Hương - Đọc truyện tuổi dậy thì ý nghĩa",
        caption: "Khoảng cách thế hệ được lấp đầy bằng hương trầm ấm áp và sự thấu cảm sâu sắc.",
        hashtags: "#tuoidaythi #tramhuong #ketnoidongbao #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🕯️ KHI THIẾU NIÊN BƯỚC VÀO THẾ GIỚI CỦA THẾ HỆ TRƯỚC 🕯️",
        caption: "Làm thế nào để gắn kết con tuổi dậy thì với ông bà? Hãy đọc câu chuyện 'Tiếng Vang Từ Đảo Trầm Hương' để thấy sự thấu cảm có thể chữa lành và rút ngắn khoảng cách thế hệ như thế nào.",
        hashtags: "#BaoBoiTeen #TuổiMớiLớn #GắnKếtGiaĐình #VănHóaViệt #TrưởngThành",
        format: "Bài viết chia sẻ tâm lý tuổi teen",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Tiếng Vang Từ Đảo Trầm Hương | Câu Chuyện Trưởng Thành Sâu Sắc Cho Tuổi Teen",
        caption: "Bản audio chất lượng cao dành cho tuổi thiếu niên tự chiêm nghiệm về nguồn cội, gia đình và giá trị văn hóa truyền thống Việt Nam.",
        hashtags: "#audiobookvietnam #tuoiteen #vanhoaviet #truyentruongthanh #baoboi",
        format: "Video ngang nghệ thuật",
        aspectRatio: "16:9",
        duration: "8:10",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Làm thế nào để gỗ gió bầu biến thành trầm hương quý giá? 🌳💎 #shorts",
        caption: "Lời khuyên thấm thía của người ông nội nghệ nhân dành cho đứa cháu nổi loạn.",
        hashtags: "#shorts #baoboi #tramhuong #chuyennguyen #truyenthieunhi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Bài học trưởng thành sâu sắc từ quá trình chưng cất trầm hương 🕯️✨ #shorts",
        caption: "Dành riêng cho các bạn trẻ đang tìm kiếm lối đi riêng của bản thân. Hãy lắng nghe Bảo Bối nhé!",
        hashtags: "#tamsu #tuoiteenvietnam #songcham #giadinhxua #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:59",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Hương Trầm Và Sự Trưởng Thành Của Thiếu Niên 🌳",
        caption: "Bức tranh tuổi trẻ đầy trăn trở nhưng ngập tràn yêu thương bên ông nội.",
        hashtags: "#teenmentalhealth #familyconnections #heritagekids #vietnameseculture #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện ý nghĩa giáo dục gia đình: Tiếng Vang Từ Đảo Trầm Hương",
        caption: "Món quà tinh thần giúp kết nối con cái tuổi ẩm ương với truyền thống gia đình tốt đẹp.",
        hashtags: "#zalo #baoboi #giadinh #ketnoi",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 9: Tiếng Vang Từ Đảo Trầm Hương | Radio Trưởng Thành Bảo Bối",
        caption: "Những dòng tự sự sâu lắng đưa các bạn trẻ hòa mình vào thiên nhiên và những giá trị cốt lõi.",
        hashtags: "#podcasttuoiteen #tamsugiadinh #chuyenhaianh",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "8:10",
        thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Thấu Cảm] Khi con bước vào tuổi dậy thì và nổi loạn",
        caption: "Làm thế nào để đồng hành cùng con vượt qua giai đoạn khủng hoảng bản sắc cá nhân? Gợi ý từ câu chuyện...",
        hashtags: "#newsletter #dayconteen #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-10",
    title: "Phía Sau Bức Tường Lửa",
    seriesName: "Thế Giới Số An Toàn",
    ageGroup: "12-15",
    topic: "Kỹ năng sống",
    mainEmotion: "Đồng cảm",
    skill: "An toàn mạng và tư duy phản biện",
    description: "Nhóm bạn trẻ phát hiện ra chiêu trò lừa đảo qua mạng xã hội nhắm vào tài khoản game, cùng nhau thiết lập hàng rào bảo mật phòng thủ.",
    longDescription: "Hải, một game thủ học sinh cừ khôi, bỗng nhiên bị hack mất nick game leo rank đã cày cuốc suốt 2 năm. Nguyên nhân là do Hải cả tin nhấp vào đường link nhận quà miễn phí từ một tài khoản giả danh admin. Quyết tâm lấy lại công bằng và bảo vệ các bạn học khác trong trường khỏi bẫy lừa đảo mạng, Hải cùng hai người bạn giỏi lập trình và thiết kế đồ họa tạo ra một chiến dịch truyền thông về an toàn bảo mật, xây dựng các 'bức tường lửa nhận thức' giúp học sinh tự phòng vệ thông minh trên không gian số.",
    storyText: "Hải đập mạnh tay xuống bàn, màn hình thông báo đỏ lòm: 'Mật khẩu sai. Tài khoản đã bị thay đổi email liên kết'. Cảm giác bất lực và tiếc nuối dâng trào vì tài khoản game yêu thích của cậu đã biến mất chỉ sau một cú click vào link 'Nhận 1000 vàng miễn phí'. Hai người bạn thân là Quân (mọt sách công nghệ) và Linh (cô bạn vẽ minh họa) lập tức có mặt để ứng cứu. Quân phân tích: 'Đây là hình thức tấn công lừa đảo Phishing rất phổ biến. Họ tạo website giả giống hệt trang chủ game để cướp thông tin đăng nhập'. Nhận thấy sự nguy hại, ba bạn không chỉ khôi phục bảo mật cá nhân mà còn lập trang fanpage học sinh mang tên 'Phía Sau Bức Tường Lửa'. Linh vẽ những tấm infographic siêu dễ thương cảnh báo các chiêu trò lừa đảo, Quân viết cẩm nang tạo mật khẩu mạnh và cài đặt bảo mật hai lớp (2FA). Dự án học sinh của các bạn nhanh chóng thu hút hàng nghìn lượt theo dõi của học sinh toàn trường, biến trải nghiệm cay đắng của Hải thành bài học phòng thủ số hữu ích cho cả cộng đồng.",
    wordCount: 420,
    pageCount: 3,
    readDuration: 5,
    audioDuration: 7,
    language: "vi",
    author: "Hoàng Long",
    illustrator: "Thái Mỹ",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Phía Sau Bức Tường Lửa - Truyện an toàn mạng cho teen | Bảo Bối",
    seoDescription: "Truyện giáo dục kỹ năng số thiết thực cho học sinh trung học cơ sở trước những nguy cơ lừa đảo, tấn công mạng xã hội.",
    keywords: ["an toàn thông tin mạng", "truyện an toàn số cho teen", "bảo mật hai lớp"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "published",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Cung cấp kiến thức căn bản về an toàn mạng xã hội, phòng chống tấn công giả mạo (phishing), tầm quan trọng của bảo mật hai lớp (2FA) và tư duy phản biện trước các thông tin lôi kéo trên internet.",
      discussionQuestions: [
        "Vì sao Hải lại bị mất tài khoản game của mình?",
        "Tấn công giả mạo Phishing hoạt động như thế nào và cách phòng tránh ra sao?",
        "Ở nhà, con và gia đình đã sử dụng những biện pháp nào để bảo vệ thông tin cá nhân trên mạng?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Hải, một game thủ học sinh cừ khôi, bàng hoàng nhận ra tài khoản game gắn bó suốt 2 năm bị hack mất. Cậu hối hận vì đã click vào đường link nhận quà miễn phí giả mạo trên mạng xã hội.",
        illustrationUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Nhóm bạn thân Quân (chuyên gia IT nhí) và Linh (họa sĩ của nhóm) cùng vào cuộc. Quân vạch trần chiêu thức Phishing lừa đảo thu thập thông tin và giúp Hải lấy lại tài khoản nhờ email khẩn cấp.",
        illustrationUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Họ quyết định xây dựng chiến dịch 'Phía Sau Bức Tường Lửa', chia sẻ các infographic dạy tạo mật khẩu mạnh và 2FA. Chiến dịch lan rộng, giúp toàn trường nâng cao cảnh giác bảo mật số.",
        illustrationUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Phía Sau Bức Tường Lửa - Cẩm nang an toàn số cho học sinh",
        caption: "Dạy trẻ tự vệ trước những cạm bẫy lừa đảo tinh vi trên internet.",
        hashtags: "#safenet #phishing #cybersecurity #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "💻 HACK TÀI KHOẢN VÀ CẠM BẪY MẠNG: DẠY TRẺ TỰ VỆ 💻",
        caption: "Con bạn sử dụng internet, chơi game online và có tài khoản mạng xã hội? Đừng để con trở thành nạn nhân của những kẻ lừa đảo mạng Phishing. Hãy chia sẻ câu chuyện bổ ích này cùng con.",
        hashtags: "#BaoBoiDigital #AnToànMạng #PhòngLừaĐảo #CôngNghệ #HọcSinhBảoMật",
        format: "Bài viết đính kèm hình ảnh cảnh báo",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Phía Sau Bức Tường Lửa | Bài Học Về An Toàn Mạng Cho Học Sinh Trung Học",
        caption: "Video tổng hợp các chiêu lừa đảo mạng phổ biến và cách thiết lập bức tường lửa bảo mật thông tin cá nhân hữu ích cho lứa tuổi học đường.",
        hashtags: "#antoansovietnam #cybersecurityforkids #hacknickgame #baoboi",
        format: "Video ngang mô phỏng đồ họa số",
        aspectRatio: "16:9",
        duration: "7:00",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Mất nick game 2 năm chỉ vì click 1 đường link! 😱🎮 #shorts",
        caption: "Cảnh giác cao độ với chiêu trò lừa đảo tặng quà miễn phí nhé các bạn trẻ.",
        hashtags: "#shorts #safenet #securitytips #cybercrime #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:57",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Mẹo bảo mật tài khoản game và mạng xã hội siêu an toàn 🧠🔒 #learnontiktok",
        caption: "Bảo vệ bản thân trên không gian mạng cực đơn giản cùng biệt đội tường lửa số. Follow Bảo Bối ngay!",
        hashtags: "#congnghe #antoanmạng #baomat2lop #teenlife #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:59",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Bí Kíp An Toàn Không Gian Số 🔒",
        caption: "3 quy tắc vàng bảo mật thông tin cá nhân dành riêng cho lứa tuổi teen.",
        hashtags: "#securityforstudents #digitalcitizen #stopscams #internetsafety #baoboi",
        format: "Carousel 5 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Cảnh báo học đường: Các chiêu trò lừa đảo lấy tài khoản số của học sinh",
        caption: "Bảo Bối Story Hub gửi tặng cẩm nang an toàn số hữu ích cho gia đình.",
        hashtags: "#zalo #baoboi #antoanso #phongchongphishing",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 10: Phía Sau Bức Tường Lửa | Sống An Toàn Trên Không Gian Số",
        caption: "Podcast chia sẻ thẳng thắn về cuộc sống số của học sinh hiện đại và những cạm bẫy cần phòng tránh.",
        hashtags: "#podcastantoanso #hocsinhviet #kynangmem",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "7:00",
        thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Kỹ Năng Số] Trang bị khiên phòng vệ cho con trên internet",
        caption: "Internet là kho tàng nhưng cũng đầy hiểm họa. Cùng thảo luận với con về cách thiết lập mật khẩu mạnh...",
        hashtags: "#newsletter #kynangso #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "5 phút",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-11",
    title: "Chạy Trốn Khỏi Vùng An Toàn",
    seriesName: "Trưởng Thành Và Thử Thách",
    ageGroup: "12-15",
    topic: "Lòng dũng cảm",
    mainEmotion: "Đồng cảm",
    skill: "Tự tin đối diện thử thách mới",
    description: "Một nữ sinh nhút nhát vượt qua nỗi sợ đám đông để đăng ký tham gia câu lạc bộ tranh biện tiếng Anh cấp thành phố.",
    longDescription: "Vy luôn là một cô bé đứng trong bóng râm của lớp học. Vy có tư duy sâu sắc và vốn từ vựng phong phú, nhưng nỗi sợ nói trước đám đông khiến Vy không bao giờ dám phát biểu. Được sự động viên của cô giáo chủ nhiệm, Vy đăng ký tham gia câu lạc bộ tranh biện của trường. Quá trình chuẩn bị căng thẳng cùng các vòng thi đầy kịch tính buộc Vy phải chạy trốn khỏi vùng an toàn quen thuộc của mình. Từ những giọt nước mắt run rẩy ban đầu, Vy đã dũng cảm bước lên bục thuyết trình để cất tiếng nói đanh thép bảo vệ quan điểm riêng.",
    storyText: "Vy đứng sau cánh gà sân khấu, lòng bàn tay ướt đẫm mồ hôi, tim đập thình thịch như muốn nhảy ra khỏi lồng ngực. Bên ngoài kia là hơn 300 khán giả đang hướng mắt về phía bục tranh biện. Vy thầm nghĩ: 'Mình đã sai lầm khi đăng ký tham gia giải đấu này. Mình nên trốn trong góc phòng như trước đây'. Một giọng nói ấm áp vang lên: 'Vy ơi, không ai sinh ra đã tự tin, dũng cảm là khi bạn run rẩy nhưng vẫn tiến về phía trước!'. Đó là cô bạn cùng nhóm tranh biện đang siết nhẹ tay Vy. Vy nhắm mắt, hít một hơi thật sâu. Chạy trốn khỏi vùng an toàn không có nghĩa là không sợ hãi, mà là từ chối để nỗi sợ định đoạt giới hạn của mình. Vy bước ra ánh đèn sân khấu chiếu rọi. Bắt đầu bằng một giọng nói run run, Vy dần tìm lại nhịp điệu của lý lẽ sắc sảo. Cả khán phòng im phăng phắc theo dõi lập luận chặt chẽ của Vy về biến đổi khí hậu. Khi Vy kết thúc bài thuyết trình bằng một nụ cười rạng rỡ, tiếng vỗ tay rầm rộ vang lên vang dội. Vy nhận ra thế giới rộng lớn đang vẫy chào những bước chân dám đương đầu thử thách.",
    wordCount: 460,
    pageCount: 3,
    readDuration: 6,
    audioDuration: 8,
    language: "vi",
    author: "Bích Vân",
    illustrator: "Hoàng Giang",
    voiceNarrator: "Cô Hồng Nhung",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Chạy Trốn Khỏi Vùng An Toàn - Truyện tranh biện cho teen | Bảo Bối",
    seoDescription: "Truyện thiếu niên truyền cảm hứng giúp trẻ tự tin bứt phá giới hạn bản thân, rèn luyện kỹ năng thuyết trình thuyết phục.",
    keywords: ["tranh biện học sinh", "vượt qua nỗi sợ nói trước đám đông", "tự tin bản thân"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "approved",
    reviewer: "Ban Biên Tập Bảo Bối",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Khuyến khích các bạn trẻ vượt qua rào cản tự ti, học cách đối diện với áp lực xã hội và rèn luyện kỹ năng tranh biện, tư duy đa chiều và thuyết trình tự tin trước đám đông.",
      discussionQuestions: [
        "Vy đã cảm nhận được những nỗi sợ sinh lý nào khi chuẩn bị bước lên bục thuyết trình?",
        "Người bạn của Vy đã định nghĩa thế nào về 'lòng dũng cảm'?",
        "Con đã bao giờ thử làm một việc mà bản thân cảm thấy sợ hãi chưa? Bài học con rút ra là gì?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Vy là một nữ sinh khép kín, luôn chọn ngồi bàn cuối để tránh mọi sự chú ý. Cậu rất muốn tham gia câu lạc bộ tranh biện tiếng Anh nhưng nỗi sợ nói trước đám đông kìm hãm Vy lại.",
        illustrationUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Vy lấy hết can đảm đăng ký cuộc thi cấp trường. Đứng trước hàng trăm ánh mắt, Vy run lẩy bẩy suýt từ bỏ. Nhớ lời khuyên của cô giáo, Vy hít sâu và cất tiếng nói đại diện quan điểm nhóm.",
        illustrationUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Giọng nói Vy từ run rẩy dần trở nên tự tin đanh thép đầy tính thuyết phục. Khi bài thuyết trình kết thúc trong tràng pháo tay ròn rã, Vy nhận ra mình đã vượt qua ranh giới vùng an toàn cũ.",
        illustrationUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Chạy Trốn Khỏi Vùng An Toàn - Đọc truyện rèn tự tin tuổi teen",
        caption: "Bứt phá nỗi sợ hãi nói trước đám đông cùng câu chuyện tranh biện của Vy.",
        hashtags: "#tranhbien #tutin #vuotquasohai #teenlearning #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "🎙️ BƯỚC RA KHỎI VÙNG AN TOÀN: BÀI HỌC CHO CON TỰ TIN 🎙️",
        caption: "Nỗi sợ nói trước đám đông đứng đầu danh sách các nỗi sợ phổ biến nhất. Hãy cùng đồng hành cùng Vy trong hành trình bứt phá giới hạn và cất lên tiếng nói bảo vệ quan điểm riêng.",
        hashtags: "#BaoBoiTrưởngThành #TranhBiệnHọcSinh #KỹNăngThuyếtTrình #TựTin #TuổiTeen",
        format: "Bài viết đính kèm hình ảnh truyền cảm hứng",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Chạy Trốn Khỏi Vùng An Toàn | Câu Chuyện Giúp Học Sinh Vượt Qua Nỗi Sợ Nói Trước Đám Đông",
        caption: "Một câu chuyện truyền động lực mạnh mẽ cho các bạn học sinh đang rụt rè, e sợ trước những thử thách mới ngoài xã hội.",
        hashtags: "#kynangthuyettrinh #damsongkhac #tuoiteenvietnam #baoboi",
        format: "Video ngang hoạt họa nghệ thuật",
        aspectRatio: "16:9",
        duration: "8:00",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Dũng cảm là khi bạn run rẩy nhưng vẫn bước lên phía trước! 💪🎤 #shorts",
        caption: "Khoảnh khắc thay đổi cuộc đời của cô nữ sinh nhút nhát Vy tại cuộc thi tranh biện trường.",
        hashtags: "#shorts #motivaltion #kynangtranhbien #tutin #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:56",
        thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "3 bước đơn giản giúp bạn tự tin thuyết trình trước hàng trăm người 🧠🎤 #shorts",
        caption: "Mẹo nhỏ đắt giá rút ra từ câu chuyện bứt phá của Vy. Follow ngay Bảo Bối để học kỹ năng mềm hữu ích nhé!",
        hashtags: "#thuyettrinh #kynangmem #hocsinhvietnam #kynanghoc #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:55",
        thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Tự Tin Nói Trước Đám Đông 🎤",
        caption: "Bí quyết giúp bạn bứt phá giới hạn và làm chủ bục thuyết trình.",
        hashtags: "#publicspeakingtips #studentlife #selfconfidence #teenmotivation #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện kỹ năng mềm cho học sinh: Chạy Trốn Khỏi Vùng An Toàn",
        caption: "Cẩm nang hướng dẫn con trẻ tự tin hội nhập và thể hiện tiếng nói cá nhân.",
        hashtags: "#zalo #baoboi #thuyettrinh #tutin",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 11: Chạy Trốn Khỏi Vùng An Toàn | Cẩm Nang Phát Triển Bản Thân",
        caption: "Podcast trò chuyện thân thiện truyền động lực vượt qua rào cản e dè trong trường học.",
        hashtags: "#podcasttuoiteen #tutinphatbieu #baoboihub",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "8:00",
        thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-28",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Kỹ Năng] Đồng hành cùng con vượt qua nỗi sợ nói trước đám đông",
        caption: "Tại sao thuyết trình lại là nỗi ám ảnh lớn của học sinh? Hãy giúp con rèn luyện kỹ năng này...",
        hashtags: "#newsletter #daycontutin #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
        publishStatus: "ready",
        scheduledDate: "2026-05-29",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-12",
    title: "Ống Kính Ký Ức",
    seriesName: "Trưởng Thành Và Thử Thách",
    ageGroup: "12-15",
    topic: "Gia đình",
    mainEmotion: "Đồng cảm",
    skill: "Kết nối thế hệ và lòng tri ân",
    description: "Nhặt được chiếc máy ảnh cơ cũ của người cha quá cố, cô bé học cách nắm giữ những lát cắt bình yên của cuộc sống thông qua nhiếp ảnh.",
    longDescription: "Hân tìm thấy một chiếc máy ảnh phim cơ cũ kỹ bám đầy bụi của bố mình trong ngăn tủ kho. Bố Hân đã mất từ khi cô bé còn rất nhỏ, hình bóng của bố trong Hân vô cùng mờ nhạt. Nhận được sự hướng dẫn chu đáo từ người chú làm nghề chụp ảnh, Hân tập tành chụp những khoảnh khắc lao động giản dị của mẹ, nụ cười nhăn nheo của bà nội và ánh nắng sớm chiếu qua giàn hoa thiên lý. Qua ống kính phim cũ kỹ đòi hỏi sự kiên nhẫn, Hân hiểu được góc nhìn đầy yêu thương và nâng niu cuộc sống mà người bố hiền từ của mình từng muốn gửi gắm.",
    storyText: "Hân nhẹ nhàng lau sạch lớp bụi bám trên chiếc máy ảnh Canon QL17 cũ của bố. Đối với Hân, bố chỉ là những mảnh ký ức chắp vá qua lời kể của mẹ. Cậu chú chỉ cho Hân cách lắp cuộn phim 35mm vào buồng tối, cách xoay vòng lấy nét cơ học thật chậm rãi. Mỗi bức ảnh phim là một sự chờ đợi, không giống điện thoại thông minh chụp hàng chục bức trong chớp mắt. Hân bắt đầu nhìn cuộc sống chậm lại. Cô bé hướng ống kính về phía đôi bàn tay gầy gộc của mẹ đang tỉ mỉ nhặt rau thơm, rồi đến nụ cười rạng rỡ đầy nếp nhăn của bà nội bên hiên nhà lấp lánh nắng. Khi cuộn phim đầu tiên được tráng rửa thành công trong phòng tối, những bức ảnh hiện lên chân thực, ấm áp lạ lùng. Hân chợt nhận ra bố đã nhìn ngắm gia đình bằng tình yêu thương vô bờ bến qua lăng kính này. Chiếc máy ảnh cũ không chỉ ghi lại hình ảnh, mà còn truyền tải sợi dây liên kết vô hình nối liền quá khứ ấm áp của bố với tương lai đầy khát vọng của Hân.",
    wordCount: 430,
    pageCount: 3,
    readDuration: 6,
    audioDuration: 7,
    language: "vi",
    author: "Khánh Linh",
    illustrator: "Thanh Trúc",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "Bảo lưu mọi bản quyền - Bảo Bối Story Hub",
    seoTitle: "Ống Kính Ký Ức - Truyện gia đình xúc động | Bảo Bối",
    seoDescription: "Truyện ngắn sâu sắc nuôi dưỡng tình cảm gia đình, lòng tri ân và cách cảm nhận vẻ đẹp mộc mạc của cuộc sống quanh ta.",
    keywords: ["máy ảnh cơ cũ", "kết nối gia đình", "ảnh phim kỷ niệm"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=500&auto=format&fit=crop",
    audioFile: "/audio/mock-audio.mp3",
    reviewStatus: "draft",
    reviewer: "Chưa duyệt",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: false, // AI image check placeholder
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: false
    },
    parentGuide: {
      educationalValue: "Giúp trẻ cảm nhận được giá trị của việc lưu giữ ký ức gia đình, biết ơn công sinh thành dưỡng dục và rèn luyện lối sống chậm rãi, quan sát trân trọng thế giới xung quanh.",
      discussionQuestions: [
        "Vì sao Hân lại muốn tập chụp ảnh bằng chiếc máy ảnh cơ cũ của người cha đã mất?",
        "Việc chụp ảnh phim đòi hỏi sự kiên nhẫn khác biệt thế nào với việc chụp ảnh kỹ thuật số hiện đại?",
        "Có đồ vật kỷ niệm nào của gia đình khiến con cảm thấy ấm áp hay tò mò mỗi khi chạm vào không?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "Trong một lần tìm đồ gia đình, Hân nhặt được chiếc máy ảnh phim cơ cũ kỹ của bố quá cố bám đầy bụi. Cô bé cảm thấy vô cùng tò mò về thế giới qua con mắt của người bố xa vắng.",
        illustrationUrl: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Dưới sự chỉ dạy kiên nhẫn của chú, Hân học cách xoay nét chỉnh khẩu từng bước. Vy chụp nụ cười của bà nội bên hoa hiên vàng, bóng lưng mẹ tảo tần dưới nắng sớm chắt chiu.",
        illustrationUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
      },
      {
        pageNumber: 3,
        text: "Bức ảnh tráng xong đẹp rực rỡ nét mộc mạc cổ xưa. Nhìn vào đó, Hân thấu nhận tình cảm đầm ấm mà bố đã lưu lại, kết nối trọn vẹn tình thương gia đình truyền qua nhiều thế hệ.",
        illustrationUrl: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=600&auto=format&fit=crop"
      }
    ],
    socialOutputs: {
      website: {
        title: "Ống Kính Ký Ức - Kết nối thế hệ qua nhiếp ảnh truyền thống",
        caption: "Câu chuyện gia đình xúc động chạm đến trái tim người đọc trẻ tuổi.",
        hashtags: "#mayanhcu #tinhcamgiadinh #nhiepanhphim #baoboi",
        format: "Website Article",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "automatic",
        warningRequired: false
      },
      facebook: {
        title: "📸 KÝ ỨC GIA ĐÌNH QUA LĂNG KÍNH PHIM CỔ ĐIỂN 📸",
        caption: "Bố mẹ có lưu giữ những kỷ vật gia đình ngày xưa? 'Ống Kính Ký Ức' kể câu chuyện nhỏ về tình cha con và những mảnh ký ức được tái sinh qua bàn tay của cô bé Hân 14 tuổi.",
        hashtags: "#BaoBoiTrưởngThành #TìnhCảmGiaĐình #NhiếpẢnhPhim #KỷVậtGiaĐình #TriÂn",
        format: "Hình ảnh kèm link chia sẻ",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Ống Kính Ký Ức | Câu Chuyện Gia Đình Cảm Động Về Chiếc Máy Ảnh Của Bố",
        caption: "Bản kể chuyện audio kèm hình ảnh mang đến những giây phút tĩnh lặng giúp các em thiếu niên học cách yêu thương gia đình.",
        hashtags: "#audiotruyenky #tinhphutu #mayanhphim #baoboi",
        format: "Video ngang lồng tiếng ấm áp",
        aspectRatio: "16:9",
        duration: "7:15",
        thumbnail: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Chụp ảnh phim thời nay khác gì điện thoại thông minh? 📸🎞️ #shorts",
        caption: "Hành trình tập tành chụp ảnh phim tỉ mỉ của cô bé Hân.",
        hashtags: "#shorts #filmacamera #photographylovers #giadinhviet #baoboi",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:52",
        thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Học cách sống chậm lại để yêu thương gia đình nhiều hơn 📸❤️ #shorts",
        caption: "Chiếc máy ảnh cũ và sợi dây tình cảm thiêng liêng gắn kết hai thế hệ. Cùng xem tại Bảo Bối nhé!",
        hashtags: "#giadinhlavogia #songcham #chupanhphim #nhiethuyetyeuthuong #baoboi",
        format: "Video đứng lồng tiếng",
        aspectRatio: "9:16",
        duration: "0:58",
        thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Máy Ảnh Cổ Và Ký Ức Của Cha 📸",
        caption: "Lưu giữ những khoảnh khắc bình dị đầy tình thương bên gia đình thân yêu.",
        hashtags: "#familyarchives #vintagecamera #analogvibes #lovegranny #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện kể gia đình cuối tuần: Ống Kính Ký Ức",
        caption: "Câu chuyện nhẹ nhàng lắng đọng đầy tri ân nuôi dưỡng tâm hồn con trẻ.",
        hashtags: "#zalo #baoboi #truyenaudio #tinhphutu",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 12: Ống Kính Ký Ức | Hoài Niệm Gia Đình Ấm Áp",
        caption: "Audio kể chuyện thư giãn giúp bồi đắp trí tuệ cảm xúc cho các em thiếu niên.",
        hashtags: "#podcastthieunhi #chuyenphim #hoainiembaoboi",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "7:15",
        thumbnail: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Bảo Bối Kỷ Vật] Trân trọng từng lát cắt bình yên của cuộc đời",
        caption: "Tại sao việc lưu giữ ảnh kỷ niệm lại là cách tuyệt vời gắn kết các thành viên trong gia đình? Trải nghiệm cùng...",
        hashtags: "#newsletter #dayconeq #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "6 phút",
        thumbnail: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      }
    }
  },
  {
    id: "story-mermaid",
    title: "Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm",
    titleEn: "The Little Mermaid and The Bridge of Empathy",
    seriesName: "Cổ tích biển xanh",
    ageGroup: "3-8",
    topic: "Thấu cảm",
    mainEmotion: "Yêu thương",
    skill: "Thấu cảm & Sẻ chia",
    description: "Câu chuyện về nàng tiên cá Ariel dùng tiếng hát ấm áp xoa dịu nỗi sợ và giúp đỡ cậu bé trên bờ.",
    descriptionEn: "A story about the little mermaid Ariel using her warm voice to soothe a boy's fear on the shore.",
    longDescription: "Dưới lòng đại dương bao la, nàng tiên cá Ariel luôn tò mò về thế giới trên mặt nước. Một hôm, Ariel bơi đến gần bờ cát và nghe thấy tiếng khóc của một cậu bé đi lạc. Bằng sự thấu cảm và lòng nhân ái, cô đã hát một khúc ca êm dịu xoa dịu nỗi sợ hãi của cậu bé, giúp cậu có thêm dũng cảm tìm đường về nhà. Câu chuyện dạy trẻ bài học quý giá về việc cảm nhận cảm xúc của người khác và sẻ chia yêu thương không biên giới.",
    storyText: "Trang 1: Bức tranh đại dương bao la và Ariel đang nhìn lên mặt nước đầy ánh nắng lấp lánh.\nTrang 2: Nàng tiên cá nhỏ Ariel sống dưới đại dương xanh thẳm, nhưng tâm hồn cô luôn hướng về thế giới tràn đầy ánh sáng trên mặt đất.\nTrang 3: Bức tranh Ariel bơi đến gần một rạn đá ven bờ cát vàng.\nTrang 4: Một buổi chiều, Ariel bơi đến gần bờ biển và nghe thấy tiếng khóc thút thít. Một cậu bé đang ngồi cô đơn trên cát vì bị lạc đường.\nTrang 5: Bức tranh Ariel nhô lên mặt nước, hát vang khúc ca biển cả lấp lánh nốt nhạc dịu kỳ.\nTrang 6: Ariel hiểu rằng cậu bé đang rất sợ hãi. Cô cất tiếng hát êm dịu của biển cả. Giọng hát ngọt ngào như lời ru của mẹ giúp cậu bé vơi đi nỗi sợ.\nTrang 7: Bức tranh cậu bé mỉm cười vẫy tay chào Ariel khi tìm thấy gia đình.\nTrang 8: Có thêm dũng cảm nhờ khúc ca, cậu bé bước đi và tìm thấy bố mẹ. Ariel mỉm cười hạnh phúc, cô nhận ra thấu cảm chính là chiếc cầu nối ấm áp nhất.",
    wordCount: 180,
    pageCount: 8,
    readDuration: 4,
    audioDuration: 4,
    language: "vi",
    author: "Bảo Bối Biên Tập",
    illustrator: "Nguyễn Mỹ Thuật",
    voiceNarrator: "Chị Hướng Dương",
    copyrightStatus: "approved",
    seoTitle: "Đọc truyện Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm | Bảo Bối Story Hub",
    seoDescription: "Truyện cổ tích nàng tiên cá phiên bản giáo dục thấu cảm cho bé 3-8 tuổi. Có audio kể chuyện truyền cảm và tranh minh họa tuyệt đẹp.",
    keywords: ["nàng tiên cá", "thấu cảm", "truyện cổ tích", "audio thiếu nhi", "truyện ngủ ngon"],
    thumbnailHorizontal: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop",
    thumbnailVertical: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
    squareImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop",
    audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    reviewStatus: "published",
    safetyChecklist: {
      noHarmfulContent: true,
      noDirectAdvertising: true,
      noOpenChat: true,
      noUnmoderatedComments: true,
      noExcessiveDataCollection: true,
      noRealChildImages: true,
      noAIWithoutHumanReview: true,
      ageAppropriateVocab: true,
      positiveEmotionalFraming: true,
      parentDiscussionQuestions: true,
      copyrightChecked: true,
      finalHumanApproval: true
    },
    parentGuide: {
      educationalValue: "Giúp trẻ học cách nhận diện khi người khác buồn bã, sợ hãi và biết cách chia sẻ, xoa dịu bằng những hành động nhỏ ấm áp của mình.",
      discussionQuestions: [
        "Tại sao Ariel lại muốn giúp đỡ cậu bé trên bờ cát?",
        "Tiếng hát của Ariel đã giúp cậu bé cảm thấy như thế nào?",
        "Khi thấy một người bạn đang khóc hoặc lo lắng, con sẽ làm gì để giúp bạn vui lên?"
      ]
    },
    pages: [
      {
        pageNumber: 1,
        text: "",
        illustrationUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop"
      },
      {
        pageNumber: 2,
        text: "Dưới lòng đại dương bao la và xanh thẳm, nơi có những rạn san hô lấp lánh đủ sắc màu, nàng tiên cá nhỏ Ariel sống hạnh phúc cùng gia đình. Thế nhưng, cô luôn ngước nhìn lên mặt nước lấp lánh ánh nắng và mơ về những chuyến phiêu lưu kỳ thú trên thế giới loài người.",
        illustrationUrl: ""
      },
      {
        pageNumber: 3,
        text: "",
        illustrationUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
      },
      {
        pageNumber: 4,
        text: "Vào một buổi chiều hoàng hôn nhuộm hồng cả mặt biển, Ariel bơi đến gần một bờ cát vàng hoang sơ. Bất chợt, cô nghe thấy tiếng khóc nấc khe khẽ. Nấp sau rạn đá, Ariel nhìn thấy một cậu bé đang ngồi bó gối cô đơn, đôi mắt ngập tràn lo âu vì bị lạc mất gia đình.",
        illustrationUrl: ""
      },
      {
        pageNumber: 5,
        text: "",
        illustrationUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
      },
      {
        pageNumber: 6,
        text: "Trái tim nhỏ bé của Ariel nhói lên khi cảm nhận được nỗi sợ hãi tột cùng của cậu bé. Không ngần ngại, cô nhô lên mặt nước, giữ một khoảng cách an toàn rồi cất tiếng hát. Giọng ca trong trẻo, ngọt ngào của Ariel vang lên như lời ru êm dịu xoa dịu mọi cơn bão giông.",
        illustrationUrl: ""
      },
      {
        pageNumber: 7,
        text: "",
        illustrationUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop"
      },
      {
        pageNumber: 8,
        text: "Khúc ca biển cả ấm áp truyền cho cậu bé dũng cảm phi thường. Cậu nín khóc, đứng dậy đi dọc bờ biển và nhanh chóng đoàn tụ với bố mẹ đang lo lắng tìm kiếm. Nhìn cậu bé mỉm cười vẫy tay chào đại dương, Ariel nhận ra thấu cảm chính là chiếc cầu nối kỳ diệu nhất gắn kết muôn loài.",
        illustrationUrl: ""
      }
    ],
    socialOutputs: {
      website: {
        title: "Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm",
        caption: "Khám phá câu chuyện giáo dục ấm lòng đầy tính nhân văn.",
        hashtags: "#cổtích #thấucảm #bảobối",
        format: "Web Story",
        aspectRatio: "16:9",
        duration: "4 phút",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "published",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      youtubeLong: {
        title: "Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm | Truyện Kể Cho Bé Ngủ Ngon",
        caption: "Bản đầy đủ chất lượng cao giúp nuôi dưỡng trí tuệ cảm xúc cho trẻ.",
        hashtags: "#cổtíchnàngtiêncá #ngủngonbaoboi",
        format: "Video ngang",
        aspectRatio: "16:9",
        duration: "4:00",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      youtubeShorts: {
        title: "Bài học thấu cảm từ Nàng Tiên Cá 🧜‍♀️",
        caption: "Bài học sẻ chia ấm áp giúp bé phát triển toàn diện cảm xúc.",
        hashtags: "#shorts #dạyconnhânái",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:50",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      tiktok: {
        title: "Ariel và bài học thấu cảm ngọt ngào 🌊 #learnontiktok",
        caption: "Sự thấu cảm là ngôn ngữ chung của thế giới! Cùng khám phá câu chuyện.",
        hashtags: "#giaoducsom #baoboi #storyhub",
        format: "Video đứng",
        aspectRatio: "9:16",
        duration: "0:50",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      facebook: {
        title: "Câu chuyện tuần này: Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm",
        caption: "Dạy bé biết quan sát và thấu hiểu cảm xúc của người khác thông qua hình tượng nàng tiên cá thân thuộc...",
        hashtags: "#bảobốistory #nuôidạytâmhồn",
        format: "Bài viết kèm ảnh",
        aspectRatio: "1:1",
        duration: "4 phút",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      instagramCarousel: {
        title: "Chiếc cầu nối mang tên Thấu Cảm 💕",
        caption: "Trượt để cùng Ariel cảm nhận và sẻ chia lòng nhân ái nhé ba mẹ ơi!",
        hashtags: "#eqforkids #littlemermaid #empathy #baoboi",
        format: "Carousel 4 slides",
        aspectRatio: "1:1",
        duration: "N/A",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      zaloOA: {
        title: "Truyện kể rèn luyện EQ: Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm",
        caption: "Món quà tinh thần nuôi dưỡng lòng trắc ẩn cho bé yêu vào tối nay.",
        hashtags: "#zalo #baoboi #nuoiconEQ",
        format: "Bài viết",
        aspectRatio: "16:9",
        duration: "4 phút",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      podcast: {
        title: "Tập 13: Nàng Tiên Cá Và Nhịp Cầu Thấu Cảm | Giọng Đọc Chị Hướng Dương",
        caption: "Giọng kể truyền cảm đưa con trẻ vào thế giới thấu cảm kỳ diệu dưới đáy biển xanh.",
        hashtags: "#podcastthieunhi #chuyengkhekhuya #eqbaoboi",
        format: "Audio MP3",
        aspectRatio: "N/A",
        duration: "4:00",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      },
      newsletter: {
        title: "[Hành Trình Nuôi Dưỡng EQ] Khi con trẻ học được sự thấu cảm",
        caption: "Làm thế nào để hướng con biết quan tâm và thấu hiểu cảm xúc xung quanh? Câu chuyện Ariel tuần này...",
        hashtags: "#newsletter #dayconEQ #baoboi",
        format: "Email",
        aspectRatio: "N/A",
        duration: "4 phút",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=500&auto=format&fit=crop",
        publishStatus: "draft",
        scheduledDate: "",
        mode: "manual",
        warningRequired: false
      }
    }
  }
];
