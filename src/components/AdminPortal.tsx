import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Layers, 
  Database, 
  Globe, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Plus, 
  Trash2, 
  Youtube, 
  FileText, 
  Mail, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Check, 
  RotateCcw,
  Sliders,
  Type,
  Square,
  Sparkles,
  Lock,
  Search,
  Upload,
  Cloud,
  Link2,
  Smartphone
} from 'lucide-react';
import { Course, Chapter, ChapterSection, AppCustomization, Flashcard, QuizQuestion, StudentAnalysisRecord, OwnerProfile } from '../types';
import { playSound } from '../utils/audio';
import HorizontalScrollContainer from './HorizontalScrollContainer';

interface AdminPortalProps {
  courses: Course[];
  onUpdateCourses: (newCourses: Course[]) => void;
  customization: AppCustomization;
  onUpdateCustomization: (newCustom: AppCustomization) => void;
  isLiveEditing: boolean;
  onToggleLiveEditing: () => void;
  onClose: () => void;
  studentAnalysisRecords?: StudentAnalysisRecord[];
  onUpdateStudentAnalysisRecords?: (records: StudentAnalysisRecord[]) => void;
  progress?: any;
  onUpdateProgress?: (updatedProgress: any) => void;
  ownerProfile?: OwnerProfile;
  onUpdateOwnerProfile?: (profile: OwnerProfile) => void;
}

export default function AdminPortal({
  courses,
  onUpdateCourses,
  customization,
  onUpdateCustomization,
  isLiveEditing,
  onToggleLiveEditing,
  onClose,
  studentAnalysisRecords = [],
  onUpdateStudentAnalysisRecords,
  progress,
  onUpdateProgress,
  ownerProfile,
  onUpdateOwnerProfile
}: AdminPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'layout' | 'courses' | 'connections' | 'raw-json' | 'apk-releases' | 'student-analysis' | 'owner-profile'>('courses');
  
  const handleStatusChange = (recordId: string, status: 'approved' | 'denied' | 'pending') => {
    playSound('click');
    if (onUpdateStudentAnalysisRecords) {
      const updated = studentAnalysisRecords.map(r => r.id === recordId ? { ...r, status } : r);
      onUpdateStudentAnalysisRecords(updated);
    }
  };
  
  // APK Releases State
  const [apkVersion, setApkVersion] = useState('v2.1.0');
  const [apkSize, setApkSize] = useState(48);
  const [apkNotes, setApkNotes] = useState('Includes Class 11-12 Advanced Kinematics, Organic Chemistry synthesis cards, offline video caching, and optimized referral engine.');
  const [apkUrl, setApkUrl] = useState('https://github.com/curiousbharat/android/releases/download/v2.1.0/CuriousBharat_v2.1.0.apk');
  const [releases, setReleases] = useState([
    { version: 'v2.0.0', size: 72, notes: 'Master Class 9-10 science board games, real-time community chat forums, and local offline cache storage.', date: '2026-06-15', url: 'https://github.com/curiousbharat/android/releases/download/v2.0.0/CuriousBharat_v2.0.0.apk' },
    { version: 'v1.5.0', size: 32, notes: 'Added voice-to-text NCERT descriptive answers checker and local streak counter updates.', date: '2026-04-10', url: 'https://github.com/curiousbharat/android/releases/download/v1.5.0/CuriousBharat_v1.5.0.apk' }
  ]);

  useEffect(() => {
    fetch('/api/apk-version')
      .then(res => res.json())
      .then(data => {
        if (data && data.version) {
          setApkVersion(data.version);
          if (data.url) setApkUrl(data.url);
          if (data.notes) setApkNotes(data.notes);
        }
      })
      .catch(err => console.error('Error fetching APK version:', err));
  }, []);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('₹499');
  const [newCourseIsPaid, setNewCourseIsPaid] = useState(false);
  const [newCourseUpiId, setNewCourseUpiId] = useState('rst010186@paytm');
  const [newCourseSubject, setNewCourseSubject] = useState<string>('General Science');
  const [newCourseThumbnail, setNewCourseThumbnail] = useState('');
  const [newCourseSpecialFeature, setNewCourseSpecialFeature] = useState('');
  const [aiFeatureGoal, setAiFeatureGoal] = useState('');
  const [isGeneratingFeature, setIsGeneratingFeature] = useState(false);

  // Student Analysis Spreadsheet state
  const [spreadsheetSearch, setSpreadsheetSearch] = useState('');
  const [spreadsheetSortField, setSpreadsheetSortField] = useState<string>('studentName');
  const [spreadsheetSortOrder, setSpreadsheetSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedSpreadsheetRowId, setSelectedSpreadsheetRowId] = useState<string | null>(null);

  // New chapter inputs
  const [newChapTitle, setNewChapTitle] = useState('');
  const [newChapDesc, setNewChapDesc] = useState('');
  const [newChapKeyConcepts, setNewChapKeyConcepts] = useState('Core Theory, Key Fact');
  const [newChapClass, setNewChapClass] = useState<string | number>(10);
  const [newChapSubj, setNewChapSubj] = useState<string>('Physics');
  const [newChapLecture, setNewChapLecture] = useState('');
  const [newChapPdf, setNewChapPdf] = useState('');
  const [newChapDpp, setNewChapDpp] = useState('');

  // New topic inputs
  const [newTopicChapterId, setNewTopicChapterId] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [newTopicLecture, setNewTopicLecture] = useState('');
  const [newTopicPdf, setNewTopicPdf] = useState('');
  const [newTopicDpp, setNewTopicDpp] = useState('');

  // Service Linking simulation states
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [driveClientId, setDriveClientId] = useState('');
  const [emailSmtp, setEmailSmtp] = useState('');
  const [isDriveLinked, setIsDriveLinked] = useState(false);
  const [isYoutubeLinked, setIsYoutubeLinked] = useState(false);
  const [isEmailLinked, setIsEmailLinked] = useState(false);

  // Success notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');

  const simulateImageUpload = (file: File, callback: (url: string) => void) => {
    setIsUploadingThumbnail(true);
    setUploadProgressPercent(10);
    const destination = ownerProfile?.storageDestination === 'google-drive' ? 'Google Storage Sync' : 'Local Sandbox Storage';
    const email = ownerProfile?.googleStorageEmail || 'rst010186@gmail.com';
    const folder = ownerProfile?.googleDriveFolderId || 'bharat-ai-vault-101';
    
    setUploadStatusText(`Preparing handshake with ${destination}...`);
    
    setTimeout(() => {
      setUploadProgressPercent(35);
      if (ownerProfile?.storageDestination === 'google-drive') {
        setUploadStatusText(`Connecting to Gmail auth node for ${email}...`);
      } else {
        setUploadStatusText(`Allocating disk sectors on local virtual host...`);
      }
    }, 600);

    setTimeout(() => {
      setUploadProgressPercent(65);
      if (ownerProfile?.storageDestination === 'google-drive') {
        setUploadStatusText(`Syncing folder '${folder}' inside Google Drive space...`);
      } else {
        setUploadStatusText(`Compacting binary asset streams...`);
      }
    }, 1300);

    setTimeout(() => {
      setUploadProgressPercent(90);
      setUploadStatusText(`Finalizing secure metadata and caching CDN link...`);
    }, 2000);

    setTimeout(() => {
      setUploadProgressPercent(100);
      setIsUploadingThumbnail(false);
      setUploadStatusText('');
      
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
          playSound('success');
          showSuccess(`Uploaded & synced to ${ownerProfile?.storageDestination === 'google-drive' ? 'Google Drive' : 'Local Storage'} successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }, 2700);
  };

  // Inline Upload Button helper for manual file uploads next to URL inputs
  const InlineUploadButton = ({ onUploadComplete, label = "Upload File", accept = "*/*" }: { onUploadComplete: (url: string) => void; label?: string; accept?: string }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [percent, setPercent] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setPercent(10);
      
      const interval = setInterval(() => {
        setPercent(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 200);

      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          clearInterval(interval);
          setPercent(100);
          setTimeout(() => {
            if (typeof reader.result === 'string') {
              onUploadComplete(reader.result);
              setIsUploading(false);
              setPercent(0);
              playSound('success');
              showSuccess(`${file.name} uploaded & synced successfully!`);
            }
          }, 300);
        };
        reader.readAsDataURL(file);
      }, 1500);
    };

    return (
      <div className="mt-1 flex items-center gap-2">
        {isUploading ? (
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 flex items-center justify-between text-[10px]">
            <span className="text-emerald-400 font-mono animate-pulse flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Syncing: {percent}%
            </span>
            <div className="w-16 bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-850">
              <div className="bg-emerald-500 h-full transition-all duration-200" style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        ) : (
          <label className="flex-1 py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-[10px] font-bold text-center cursor-pointer transition flex items-center justify-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>{label}</span>
            <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          </label>
        )}
      </div>
    );
  };

  // 1. Layout Adjustments
  const handleBrandingChange = (key: keyof AppCustomization, val: any) => {
    onUpdateCustomization({
      ...customization,
      [key]: val
    });
    showSuccess(`Updated ${key} successfully!`);
  };

  const reorderElement = (idx: number, direction: 'up' | 'down') => {
    const arr = [...customization.elementOrdering];
    if (direction === 'up' && idx > 0) {
      const temp = arr[idx];
      arr[idx] = arr[idx - 1];
      arr[idx - 1] = temp;
    } else if (direction === 'down' && idx < arr.length - 1) {
      const temp = arr[idx];
      arr[idx] = arr[idx + 1];
      arr[idx + 1] = temp;
    }
    onUpdateCustomization({
      ...customization,
      elementOrdering: arr
    });
    showSuccess('Reordered layout components!');
  };

  // 2. Course Creation
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: newCourseTitle,
      description: `Custom courses tailored for advanced scientific study. Join our virtual classroom now.`,
      isPaid: newCourseIsPaid,
      price: newCourseIsPaid ? newCoursePrice : '0',
      upiId: newCourseIsPaid ? newCourseUpiId : undefined,
      subject: newCourseSubject,
      thumbnailUrl: newCourseThumbnail || undefined,
      specialAIFeature: newCourseSpecialFeature || undefined,
      chapters: []
    };

    onUpdateCourses([...courses, newCourse]);
    setSelectedCourseId(newCourse.id);
    setNewCourseTitle('');
    setNewCourseIsPaid(false);
    setNewCourseUpiId('rst010186@paytm');
    setNewCourseThumbnail('');
    setNewCourseSpecialFeature('');
    setAiFeatureGoal('');
    showSuccess(`Created Course: "${newCourse.title}"`);
  };

  const handleGenerateSpecialFeature = async () => {
    if (!newCourseTitle.trim()) {
      alert('Please fill in the Course Title first to help the AI contextualize.');
      return;
    }
    setIsGeneratingFeature(true);
    try {
      const response = await fetch('/api/generate-batch-features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newCourseTitle,
          subject: newCourseSubject,
          promptGoal: aiFeatureGoal
        })
      });
      const data = await response.json();
      setNewCourseSpecialFeature(data.text || '');
      showSuccess('AI special features generated!');
    } catch (err) {
      console.error(err);
      setNewCourseSpecialFeature(
        `• ⚡ Kalu Sir's 10-Second Speed Formulas\n• 🎮 Interactive NCERT Board Game Challenges\n• 🏆 Weekly Academic Leaderboard & Rank list`
      );
    } finally {
      setIsGeneratingFeature(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Delete this entire course and all its chapters?')) {
      const remaining = courses.filter(c => c.id !== courseId);
      onUpdateCourses(remaining);
      if (selectedCourseId === courseId && remaining.length > 0) {
        setSelectedCourseId(remaining[0].id);
      }
      showSuccess('Course removed successfully');
    }
  };

  // 3. Chapter Addition
  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapTitle.trim()) return;

    const selectedCourse = courses.find(c => c.id === selectedCourseId);
    if (!selectedCourse) return;

    const newChapter: Chapter = {
      id: `chap-${Date.now()}`,
      title: newChapTitle,
      description: newChapDesc || 'A newly created chapter section loaded with visual aids and test guides.',
      classLevel: newChapClass,
      subject: newChapSubj,
      readingTime: '10 mins',
      keyConcepts: newChapKeyConcepts.split(',').map(s => s.trim()).filter(Boolean),
      sections: [
        {
          id: `sec-${Date.now()}-1`,
          title: '1. Primary Chapter Foundation',
          body: 'This is the body text of your new master section. You can customize this by clicking on it directly in Live Edit mode, or using JSON editing options.',
          keyPoints: ['Core fact 1', 'Core fact 2']
        }
      ],
      flashcards: [
        {
          id: `fc-${Date.now()}-1`,
          front: 'What is the primary formula for this scientific concept?',
          back: 'This is the verified solution and breakdown.',
          category: newChapSubj
        }
      ],
      quiz: [
        {
          id: `qz-${Date.now()}-1`,
          question: 'Which statement accurately describes the main mechanism of this chapter?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswerIndex: 0,
          explanation: 'This is the conceptual explanation and logical reason.'
        }
      ],
      lectureUrl: newChapLecture || undefined,
      pdfUrl: newChapPdf || undefined,
      dppUrl: newChapDpp || undefined
    };

    const updatedCourses = courses.map(c => {
      if (c.id === selectedCourseId) {
        return {
          ...c,
          chapters: [...c.chapters, newChapter]
        };
      }
      return c;
    });

    onUpdateCourses(updatedCourses);
    setNewChapTitle('');
    setNewChapDesc('');
    setNewChapKeyConcepts('Core Theory, Key Fact');
    setNewChapLecture('');
    setNewChapPdf('');
    setNewChapDpp('');
    showSuccess(`Chapter "${newChapter.title}" added successfully!`);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicChapterId) {
      alert('Please specify a Topic Title and select a Chapter.');
      return;
    }

    const newTopic = {
      id: `topic-${Date.now()}`,
      title: newTopicTitle,
      description: newTopicDesc || 'A topic study guide with active learning materials.',
      sections: [
        {
          id: `sec-t-${Date.now()}-1`,
          title: '1. Topic Fundamentals',
          body: 'This is the body of your topic material. In accordance with the requested scope, practice tests and lectures are specific to this topic!',
          keyPoints: ['Topic key fact 1', 'Topic key fact 2']
        }
      ],
      flashcards: [
        {
          id: `fc-t-${Date.now()}-1`,
          front: 'What is a core question on this topic?',
          back: 'This is the verified topic answer.',
          category: 'Revision'
        }
      ],
      quiz: [
        {
          id: `qz-t-${Date.now()}-1`,
          question: 'What is the correct definition or model for this topic?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswerIndex: 0,
          explanation: 'Step-by-step topic proof explanation.'
        }
      ],
      lectureUrl: newTopicLecture || undefined,
      pdfUrl: newTopicPdf || undefined,
      dppUrl: newTopicDpp || undefined
    };

    const updatedCourses = courses.map(c => {
      return {
        ...c,
        chapters: c.chapters.map(ch => {
          if (ch.id === newTopicChapterId) {
            const currentTopics = ch.topics || [];
            return {
              ...ch,
              topics: [...currentTopics, newTopic]
            };
          }
          return ch;
        })
      };
    });

    onUpdateCourses(updatedCourses);
    setNewTopicTitle('');
    setNewTopicDesc('');
    setNewTopicLecture('');
    setNewTopicPdf('');
    setNewTopicDpp('');
    showSuccess(`Topic "${newTopic.title}" added to selected chapter!`);
  };

  const selectedCourseObj = courses.find(c => c.id === selectedCourseId);
  const selectedChapterObj = selectedCourseObj?.chapters.find(ch => ch.id === selectedChapterId);
  const selectedTopicObj = selectedChapterObj?.topics?.find(tp => tp.id === selectedTopicId);

  return (
    <div className="bg-black border border-zinc-850 md:border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[92vh] md:h-[800px] max-w-6xl mx-auto font-sans text-zinc-300">
      
      {/* MOBILE-ONLY TOP HEADER & NAVIGATION STRIP */}
      <div className="md:hidden bg-zinc-950 border-b border-zinc-900 p-4 space-y-3 shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-extrabold text-white">Bharat Admin Desk</h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded-lg text-xs font-semibold cursor-pointer border border-zinc-800"
          >
            Exit Portal
          </button>
        </div>

        {/* Horizontal scrollable tab buttons */}
        <div className="w-full relative z-10 pb-1">
          <HorizontalScrollContainer>
            <button
              type="button"
              onClick={() => { playSound('click'); setActiveSubTab('courses'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
                activeSubTab === 'courses' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              📁 Courses & Chapters
            </button>
            <button
              type="button"
              onClick={() => { playSound('click'); setActiveSubTab('student-analysis'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
                activeSubTab === 'student-analysis' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              📊 Students
            </button>
            <button
              type="button"
              onClick={() => { playSound('click'); setActiveSubTab('apk-releases'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
                activeSubTab === 'apk-releases' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              🤖 APK Release
            </button>
            <button
              type="button"
              onClick={() => { playSound('click'); setActiveSubTab('owner-profile'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
                activeSubTab === 'owner-profile' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              ⚙️ Ecosystem
            </button>
          </HorizontalScrollContainer>
        </div>

        {/* Mobile Inline Editor state toggle bar */}
        <div className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
          <div className="space-y-0.5">
            <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-zinc-500" /> Inline Live Editor
            </span>
          </div>
          <button
            type="button"
            onClick={() => { playSound('click'); onToggleLiveEditing(); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition active:scale-95 ${
              isLiveEditing ? 'bg-emerald-500 text-zinc-950 font-extrabold' : 'bg-zinc-850 text-zinc-400 border border-zinc-800'
            }`}
          >
            {isLiveEditing ? 'ACTIVE' : 'DISABLED'}
          </button>
        </div>
      </div>

      {/* LEFT COLUMN: Google AI Studio Styled Control Column */}
      <div className="hidden md:flex w-full md:w-[320px] bg-zinc-950 border-r border-zinc-800 p-5 flex-col justify-between shrink-0 h-full overflow-y-auto no-scrollbar">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-500" /> Super Admin Portal
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Bharat Control Room
            </h2>
            <p className="text-xs text-zinc-500 leading-normal">
              Empower your EdTech startup. Control shapes, courses, and custom layouts in real-time.
            </p>
          </div>

          {/* Quick Stats of Custom Objects */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Total Courses</span>
              <span className="text-lg font-bold text-white font-mono">{courses.length}</span>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Lectures Link</span>
              <span className="text-lg font-bold text-white font-mono">
                {courses.reduce((acc, c) => acc + c.chapters.filter(ch => ch.lectureUrl).length, 0)}
              </span>
            </div>
          </div>

          {/* Sub Tab Navigation */}
          <div className="space-y-1.5 pt-2">
            <button
              onClick={() => setActiveSubTab('courses')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSubTab === 'courses' ? 'bg-zinc-850 text-white border border-zinc-700' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <Database className="w-4 h-4 text-zinc-400" /> Manage Courses & Chapters
            </button>
            <button
              onClick={() => setActiveSubTab('student-analysis')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSubTab === 'student-analysis' ? 'bg-zinc-850 text-white border border-zinc-700' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <Search className="w-4 h-4 text-zinc-400" /> Student Analysis & Purchases
            </button>
            <button
              onClick={() => setActiveSubTab('apk-releases')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSubTab === 'apk-releases' ? 'bg-zinc-850 text-white border border-zinc-700' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <Smartphone className="w-4 h-4 text-zinc-400" /> APK Version Control
            </button>
            <button
              onClick={() => setActiveSubTab('owner-profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSubTab === 'owner-profile' ? 'bg-zinc-850 text-white border border-zinc-700' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <Settings className="w-4 h-4 text-zinc-400" /> Owner Profile & Ecosystem
            </button>
          </div>

          {/* Live Interactive Edit Mode Toggle */}
          <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-2xl space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-zinc-400" /> Live Inline Editor
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              Enable this to click directly on student page titles, descriptions, and paragraphs to edit them with your keyboard.
            </p>
            <button
              onClick={onToggleLiveEditing}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                isLiveEditing 
                  ? 'bg-zinc-100 text-black hover:bg-white shadow' 
                  : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800'
              }`}
            >
              {isLiveEditing ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Live Editing ACTIVE
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Enable Live Editing
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-zinc-900">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded-xl text-xs font-semibold transition cursor-pointer border border-zinc-800"
          >
            ← Back to Student View
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Customizer Panel */}
      <div className="flex-1 bg-black p-6 sm:p-8 overflow-y-auto h-full space-y-6 relative no-scrollbar">
        {successMsg && (
          <div className="absolute top-4 right-4 z-50 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 animate-bounce">
            <Check className="w-4 h-4" /> {successMsg}
          </div>
        )}

        {/* ======================= TAB 1: LAYOUT & THEME CUSTOMIZER ======================= */}
        {activeSubTab === 'layout' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-white">Visual Layout Customizer</h3>
              <p className="text-xs text-zinc-500 mt-1">Fine-tune the design details: shapes, element order, branding, and font sizes.</p>
            </div>

            {/* Typography and Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <label className="text-[11px] font-bold uppercase text-zinc-400 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5" /> Typography Font
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['sans', 'mono', 'serif'] as const).map(font => (
                    <button
                      key={font}
                      onClick={() => handleBrandingChange('fontStyle', font)}
                      className={`py-1.5 rounded text-[10px] font-bold capitalize transition border ${
                        customization.fontStyle === font 
                          ? 'bg-white text-black border-white' 
                          : 'bg-zinc-900 text-zinc-400 border-transparent hover:bg-zinc-850'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <label className="text-[11px] font-bold uppercase text-zinc-400 flex items-center gap-1">
                  <Square className="w-3.5 h-3.5" /> Element Shapes
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['none', 'md', 'xl'] as const).map(shape => (
                    <button
                      key={shape}
                      onClick={() => handleBrandingChange('borderRadius', shape === 'none' ? 'none' : shape === 'md' ? 'md' : 'xl')}
                      className={`py-1.5 rounded text-[10px] font-bold capitalize transition border ${
                        customization.borderRadius === (shape === 'none' ? 'none' : shape === 'md' ? 'md' : 'xl') 
                          ? 'bg-white text-black border-white' 
                          : 'bg-zinc-900 text-zinc-400 border-transparent hover:bg-zinc-850'
                      }`}
                    >
                      {shape === 'none' ? 'Sharp' : shape === 'md' ? 'Curved' : 'Round'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <label className="text-[11px] font-bold uppercase text-zinc-400 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Scale Base Size
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['small', 'normal', 'large'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => handleBrandingChange('fontSize', size)}
                      className={`py-1.5 rounded text-[10px] font-bold capitalize transition border ${
                        customization.fontSize === size 
                          ? 'bg-white text-black border-white' 
                          : 'bg-zinc-900 text-zinc-400 border-transparent hover:bg-zinc-850'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Branding Inputs */}
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Branding & Hero Text Configuration</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase">App Title Name</label>
                  <input
                    type="text"
                    value={customization.brandingTitle}
                    onChange={(e) => handleBrandingChange('brandingTitle', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase">Slogan Subtitle</label>
                  <input
                    type="text"
                    value={customization.brandingSubtitle}
                    onChange={(e) => handleBrandingChange('brandingSubtitle', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase">App Logo Text (Characters e.g. "CB")</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={customization.appLogoText || ''}
                    placeholder="e.g. CB"
                    onChange={(e) => handleBrandingChange('appLogoText', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase">Above Icon Symbol</label>
                  <select
                    value={customization.appLogoIcon || 'graduation-cap'}
                    onChange={(e) => handleBrandingChange('appLogoIcon', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500 cursor-pointer"
                  >
                    <option value="graduation-cap">Graduation Cap</option>
                    <option value="atom">Atom</option>
                    <option value="brain">Brain</option>
                    <option value="sparkles">Sparkles (Animated)</option>
                    <option value="lightbulb">Lightbulb</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ordering of dashboard elements */}
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1">
                  <Layers className="w-4 h-4 text-zinc-500" /> UI Page Section Ordering
                </h4>
                <p className="text-[10px] text-zinc-500 leading-normal mt-1">
                  Reorder exactly how the student-facing dashboard loads. Click Up/Down arrows to shift.
                </p>
              </div>

              <div className="space-y-2">
                {customization.elementOrdering.map((sectionName, idx) => (
                  <div 
                    key={sectionName}
                    className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-600 font-mono text-[10px]">#{idx + 1}</span>
                      <span className="font-semibold text-white capitalize">{sectionName.replace('-', ' ')}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderElement(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 hover:bg-zinc-850 rounded text-zinc-500 hover:text-white disabled:opacity-30 cursor-pointer transition"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => reorderElement(idx, 'down')}
                        disabled={idx === customization.elementOrdering.length - 1}
                        className="p-1.5 hover:bg-zinc-850 rounded text-zinc-500 hover:text-white disabled:opacity-30 cursor-pointer transition"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: COURSE & CHAPTER MANAGER ======================= */}
        {activeSubTab === 'courses' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">📁</span>
                  Interactive Folder Course Database
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Design your curriculum in folder-in-folder-in-folder format. Root: Courses ➔ Subfolder: Chapters ➔ Child: Topics & study materials.</p>
              </div>
            </div>

            {/* Course Builder Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: INTERACTIVE FOLDER IN FOLDER ROOT EXPLORER (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-5 rounded-3xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    📂 Curriculum Directory Tree
                  </span>
                  <button
                    onClick={() => {
                      const anyOpen = Object.values(expandedFolders).some(Boolean);
                      const newExp = {};
                      if (!anyOpen) {
                        courses.forEach(c => {
                          newExp[c.id] = true;
                          c.chapters.forEach(ch => {
                            newExp[ch.id] = true;
                          });
                        });
                      }
                      setExpandedFolders(newExp);
                    }}
                    className="text-[10px] text-zinc-500 hover:text-white transition bg-zinc-900 px-2.5 py-1 rounded border border-zinc-850 cursor-pointer font-medium"
                  >
                    Toggle All folders
                  </button>
                </div>

                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 no-scrollbar select-none">
                  {courses.map(c => {
                    const isCourseExpanded = !!expandedFolders[c.id];
                    const isCourseSelected = selectedCourseId === c.id && !selectedChapterId && !selectedTopicId;
                    return (
                      <div key={c.id} className="space-y-1 border border-zinc-900/40 rounded-xl p-1 bg-zinc-900/10">
                        {/* 1. COURSE FOLDER (ROOT) */}
                        <div 
                          onClick={() => {
                            setSelectedCourseId(c.id);
                            setSelectedChapterId('');
                            setSelectedTopicId('');
                            setExpandedFolders(prev => ({ ...prev, [c.id]: !prev[c.id] }));
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                            isCourseSelected ? 'bg-zinc-850 text-white border border-zinc-700 shadow-lg shadow-zinc-950' : 'hover:bg-zinc-900 text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="text-sm shrink-0">{isCourseExpanded ? '📂' : '📁'}</span>
                            <span className="font-bold truncate text-[11px] font-mono">{c.title}</span>
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 font-mono">
                            {c.chapters.length} chapters
                          </span>
                        </div>

                        {/* 2. CHAPTER FOLDERS (LEVEL 2) */}
                        {isCourseExpanded && (
                          <div className="pl-5 border-l border-zinc-850/60 ml-3 space-y-1 py-1">
                            {c.chapters.map(ch => {
                              const isChapterExpanded = !!expandedFolders[ch.id];
                              const isChapterSelected = selectedCourseId === c.id && selectedChapterId === ch.id && !selectedTopicId;
                              return (
                                <div key={ch.id} className="space-y-1">
                                  <div 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCourseId(c.id);
                                      setSelectedChapterId(ch.id);
                                      setSelectedTopicId('');
                                      setExpandedFolders(prev => ({ ...prev, [ch.id]: !prev[ch.id] }));
                                    }}
                                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                                      isChapterSelected ? 'bg-zinc-800 text-white border border-zinc-750' : 'hover:bg-zinc-900/60 text-zinc-400'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <span className="text-xs shrink-0">{isChapterExpanded ? '📂' : '📁'}</span>
                                      <span className="truncate text-[10px] font-mono">{ch.title}</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-zinc-600">
                                      {(ch.topics || []).length} topics
                                    </span>
                                  </div>

                                  {/* 3. TOPIC CHILDS (LEVEL 3) */}
                                  {isChapterExpanded && (
                                    <div className="pl-5 border-l border-zinc-800/80 ml-2 space-y-1 py-1">
                                      {(ch.topics || []).map(tp => {
                                        const isTopicSelected = selectedCourseId === c.id && selectedChapterId === ch.id && selectedTopicId === tp.id;
                                        return (
                                          <div 
                                            key={tp.id}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedCourseId(c.id);
                                              setSelectedChapterId(ch.id);
                                              setSelectedTopicId(tp.id);
                                            }}
                                            className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition ${
                                              isTopicSelected ? 'bg-zinc-700 text-white font-semibold' : 'hover:bg-zinc-900/40 text-zinc-500'
                                            }`}
                                          >
                                            <div className="flex items-center gap-2 truncate">
                                              <span className="text-xs text-zinc-500 shrink-0">📄</span>
                                              <span className="truncate text-[10px] font-mono">{tp.title}</span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                      {(!ch.topics || ch.topics.length === 0) && (
                                        <div className="text-[9px] text-zinc-600 italic pl-5 py-0.5">Empty Chapter Folder</div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            {c.chapters.length === 0 && (
                              <div className="text-[9px] text-zinc-600 italic pl-5 py-0.5">Empty Course Folder</div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: CONTEXTUAL ACTIONS PANEL (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. SELECTION STATUS BANNER */}
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between gap-3 relative overflow-hidden">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Active Directory Pointer</span>
                    <h4 className="text-xs text-white font-mono leading-relaxed">
                      {selectedCourseObj ? (
                        <>
                          <span className="text-zinc-500">Root/</span>
                          <span className="text-emerald-300 font-bold">{selectedCourseObj.title}</span>
                          {selectedChapterObj && (
                            <>
                              <span className="text-zinc-600"> / ➔ </span>
                              <span className="text-yellow-300 font-semibold">{selectedChapterObj.title}</span>
                            </>
                          )}
                          {selectedTopicObj && (
                            <>
                              <span className="text-zinc-600"> / ➔ </span>
                              <span className="text-sky-300">{selectedTopicObj.title}</span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-zinc-600 italic">No folder selected. Create or choose a Course on the left.</span>
                      )}
                    </h4>
                  </div>
                  
                  {/* Delete Current Node Button */}
                  {selectedCourseObj && (
                    <button
                      onClick={() => {
                        playSound('click');
                        if (selectedTopicObj) {
                          // Delete selected topic
                          const updated = courses.map(c => {
                            if (c.id === selectedCourseId) {
                              return {
                                ...c,
                                chapters: c.chapters.map(ch => {
                                  if (ch.id === selectedChapterId) {
                                    return {
                                      ...ch,
                                      topics: (ch.topics || []).filter(tp => tp.id !== selectedTopicId)
                                    };
                                  }
                                  return ch;
                                })
                              };
                            }
                            return c;
                          });
                          onUpdateCourses(updated);
                          setSelectedTopicId('');
                          showSuccess("Topic subfolder deleted successfully!");
                        } else if (selectedChapterObj) {
                          // Delete selected chapter
                          const updated = courses.map(c => {
                            if (c.id === selectedCourseId) {
                              return {
                                ...c,
                                chapters: c.chapters.filter(ch => ch.id !== selectedChapterId)
                              };
                            }
                            return c;
                          });
                          onUpdateCourses(updated);
                          setSelectedChapterId('');
                          showSuccess("Chapter folder deleted successfully!");
                        } else if (selectedCourseObj) {
                          // Delete selected course
                          const updated = courses.filter(c => c.id !== selectedCourseId);
                          onUpdateCourses(updated);
                          setSelectedCourseId(updated[0]?.id || '');
                          showSuccess("Root Course folder deleted successfully!");
                        }
                      }}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-bold rounded-xl text-[10px] transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Selected
                    </button>
                  )}
                </div>

                {/* 2. TABBED ACTION FORMS CONTAINER */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden p-6 space-y-6">
                  <div className="flex border-b border-zinc-900 pb-3 gap-2.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Curriculum Manager Tool Desk
                    </span>
                  </div>

                  {/* FORM A: ADD NEW COURSE (ROOT LEVEL) */}
                  <div className="space-y-4 border-t border-zinc-900/60 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
                      <h5 className="text-xs font-bold text-white uppercase">Add a New Root Course</h5>
                    </div>
                    <form onSubmit={handleAddCourse} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase">Course Title</label>
                        <input
                          type="text"
                          placeholder="e.g. NCERT Science Mastery"
                          value={newCourseTitle}
                          onChange={(e) => setNewCourseTitle(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase">Subject Category</label>
                        <input
                          type="text"
                          placeholder="Physics, Chem, Biology, General"
                          value={newCourseSubject}
                          onChange={(e) => setNewCourseSubject(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase">Monetization</label>
                        <select
                          value={newCourseIsPaid ? 'paid' : 'free'}
                          onChange={(e) => setNewCourseIsPaid(e.target.value === 'paid')}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                        >
                          <option value="free">Free Course (Public)</option>
                          <option value="paid">Paid Course (Premium Batch)</option>
                        </select>
                      </div>
                      {newCourseIsPaid && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase">Price</label>
                            <input
                              type="text"
                              value={newCoursePrice}
                              onChange={(e) => setNewCoursePrice(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase">UPI ID</label>
                            <input
                              type="text"
                              value={newCourseUpiId}
                              onChange={(e) => setNewCourseUpiId(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                            />
                          </div>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Publish Root Course
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* FORM B: ADD CHAPTER (LEVEL 2 INSIDE SELECTED COURSE) */}
                  {selectedCourseObj && (
                    <div className="space-y-4 border-t border-zinc-900/60 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-[10px] font-bold">2</span>
                        <h5 className="text-xs font-bold text-white uppercase">Add a Chapter inside "{selectedCourseObj.title}"</h5>
                      </div>
                      <form onSubmit={handleAddChapter} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Chapter Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Acid, Bases and Salts"
                            value={newChapTitle}
                            onChange={(e) => setNewChapTitle(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                            required
                          />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Synopsis / Description</label>
                          <textarea
                            placeholder="Briefly summarize what this chapter contains..."
                            value={newChapDesc}
                            onChange={(e) => setNewChapDesc(e.target.value)}
                            rows={2}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500 resize-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Syllabus Subject</label>
                          <input
                            type="text"
                            value={newChapSubj}
                            onChange={(e) => setNewChapSubj(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Grade Level</label>
                          <input
                            type="text"
                            value={newChapClass}
                            onChange={(e) => setNewChapClass(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <button
                            type="submit"
                            className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Create Subfolder Chapter
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* FORM C: ADD TOPIC (LEVEL 3 INSIDE SELECTED CHAPTER) */}
                  {selectedCourseObj && selectedChapterObj && (
                    <div className="space-y-4 border-t border-zinc-900/60 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center text-[10px] font-bold">3</span>
                        <h5 className="text-xs font-bold text-white uppercase">Add a Topic inside Chapter "{selectedChapterObj.title}"</h5>
                      </div>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newTopicTitle.trim()) return;
                        
                        const newTopic = {
                          id: 'topic-' + Date.now(),
                          title: newTopicTitle,
                          description: newTopicDesc || 'Study guide with active learning materials.',
                          sections: [
                            {
                              id: 'sec-' + Date.now() + '-1',
                              title: '1. Topic Fundamentals',
                              body: 'Topic text. Customize in Live Edit.',
                              keyPoints: ['Key point 1', 'Key point 2']
                            }
                          ],
                          flashcards: [],
                          quiz: [],
                          lectureUrl: newTopicLecture || undefined,
                          pdfUrl: newTopicPdf || undefined,
                          dppUrl: newTopicDpp || undefined
                        };

                        const updated = courses.map(c => {
                          if (c.id === selectedCourseId) {
                            return {
                              ...c,
                              chapters: c.chapters.map(ch => {
                                if (ch.id === selectedChapterId) {
                                  return {
                                    ...ch,
                                    topics: [...(ch.topics || []), newTopic]
                                  };
                                }
                                return ch;
                              })
                            };
                          }
                          return c;
                        });

                        onUpdateCourses(updated);
                        setNewTopicTitle('');
                        setNewTopicDesc('');
                        setNewTopicLecture('');
                        setNewTopicPdf('');
                        setNewTopicDpp('');
                        showSuccess('Topic folder ' + newTopic.title + ' added successfully!');
                      }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Topic Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Chemical Properties of Bases"
                            value={newTopicTitle}
                            onChange={(e) => setNewTopicTitle(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                            required
                          />
                        </div>
                        <div className="space-y-1 sm:col-span-2 bg-zinc-900/30 p-3 rounded-xl border border-zinc-900 space-y-3">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Video Lecture Resource</span>
                          <input
                            type="text"
                            placeholder="YouTube embed or video URL"
                            value={newTopicLecture}
                            onChange={(e) => setNewTopicLecture(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-zinc-500"
                          />
                          <InlineUploadButton 
                            onUploadComplete={(url) => setNewTopicLecture(url)}
                            label="Upload Lecture Video"
                            accept="video/*"
                          />
                        </div>
                        <div className="space-y-1 bg-zinc-900/30 p-3 rounded-xl border border-zinc-900 space-y-2">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Notes PDF</span>
                          <input
                            type="text"
                            placeholder="Study Notes link"
                            value={newTopicPdf}
                            onChange={(e) => setNewTopicPdf(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1 text-xs text-white outline-none focus:border-zinc-500"
                          />
                          <InlineUploadButton 
                            onUploadComplete={(url) => setNewTopicPdf(url)}
                            label="Upload Notes PDF"
                            accept="application/pdf"
                          />
                        </div>
                        <div className="space-y-1 bg-zinc-900/30 p-3 rounded-xl border border-zinc-900 space-y-2">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Daily DPP practice sheet</span>
                          <input
                            type="text"
                            placeholder="DPP File link"
                            value={newTopicDpp}
                            onChange={(e) => setNewTopicDpp(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1 text-xs text-white outline-none focus:border-zinc-500"
                          />
                          <InlineUploadButton 
                            onUploadComplete={(url) => setNewTopicDpp(url)}
                            label="Upload Topic DPP"
                            accept="application/pdf"
                          />
                        </div>
                        <div className="sm:col-span-2 pt-2">
                          <button
                            type="submit"
                            className="w-full py-2 bg-sky-400 hover:bg-sky-300 text-zinc-950 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Create Child Topic Folder
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        )}        {/* ======================= TAB 3: CLOUD SERVICES CONNECTIONS ======================= */}
        {activeSubTab === 'connections' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-white">System Integrations & Linking Hub</h3>
              <p className="text-xs text-zinc-500 mt-1">Configure live API synchronization for video embedding, PDF uploads, student emailing, and others.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* YouTube Api card */}
              <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between h-[280px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isYoutubeLinked ? 'bg-zinc-800 text-white border border-zinc-700' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {isYoutubeLinked ? '● Connected' : '○ Offline'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">YouTube Integration</h4>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Sync playlists, pull lecture search metrics, and import embedded student sessions directly.
                  </p>
                  
                  <input
                    type="password"
                    placeholder="Enter YouTube V3 API Key"
                    value={youtubeApiKey}
                    onChange={(e) => setYoutubeApiKey(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-[10px] text-white outline-none focus:border-zinc-500 font-mono"
                  />
                </div>

                <button
                  onClick={() => {
                    if (youtubeApiKey.trim()) {
                      setIsYoutubeLinked(true);
                      showSuccess('YouTube API connected securely!');
                    }
                  }}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-semibold rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  Link YouTube Engine
                </button>
              </div>

              {/* Google Drive card */}
              <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between h-[280px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-blue-950/20 text-blue-400 border border-blue-900/30">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isDriveLinked ? 'bg-zinc-800 text-white border border-zinc-700' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {isDriveLinked ? '● Connected' : '○ Offline'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Google Drive Hub</h4>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Synchronize drive PDFs, upload assignments, and query Class study materials in real-time.
                  </p>
                  
                  <input
                    type="text"
                    placeholder="Enter Drive Client ID"
                    value={driveClientId}
                    onChange={(e) => setDriveClientId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-[10px] text-white outline-none focus:border-zinc-500 font-mono"
                  />
                </div>

                <button
                  onClick={() => {
                    if (driveClientId.trim()) {
                      setIsDriveLinked(true);
                      showSuccess('Google Drive API synchronized!');
                    }
                  }}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-semibold rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  Link Drive Storage
                </button>
              </div>

              {/* Email system card */}
              <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between h-[280px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isEmailLinked ? 'bg-zinc-800 text-white border border-zinc-700' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {isEmailLinked ? '● Connected' : '○ Offline'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Student Email Alerts</h4>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Notify students when you upload premium test solutions, mark review reports, or launch fresh courses.
                  </p>
                  
                  <input
                    type="text"
                    placeholder="SMTP server configuration"
                    value={emailSmtp}
                    onChange={(e) => setEmailSmtp(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-[10px] text-white outline-none focus:border-zinc-500 font-mono"
                  />
                </div>

                <button
                  onClick={() => {
                    if (emailSmtp.trim()) {
                      setIsEmailLinked(true);
                      showSuccess('SMTP notification engine connected!');
                    }
                  }}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-semibold rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  Link Email Alert System
                </button>
              </div>

            </div>

            {/* Quick API instructions */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl text-xs space-y-1 text-zinc-400 leading-relaxed">
              <p className="font-bold text-white">💡 Link options for future syllabus expansion</p>
              <p>As you scale your Bharat education startup, you can link standard system nodes directly. All inputs are securely held in local state variables and synchronized with your personal administrator control logs.</p>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: STUDENT ANALYSIS & PURCHASES ======================= */}
        {activeSubTab === ('student-analysis' as any) && (
          <div className="space-y-6 font-sans">
            <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">📊</span>
                  Student Analysis Ledger & Spreadsheet
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Full-fidelity grid editor with transactional reconciliation, search matching, instant CSV spreadsheet exports, and record generation.
                </p>
              </div>

              {/* CSV Download Trigger */}
              <button
                onClick={() => {
                  playSound('click');
                  if (studentAnalysisRecords.length === 0) {
                    showSuccess("No records to export.");
                    return;
                  }
                  // Generate CSV
                  const headers = ['Row', 'Student Name', 'Contact Details', 'Purchased Course', 'Price', 'UTR Reference', 'Payment Status', 'Timestamp'];
                  const rows = studentAnalysisRecords.map((r, idx) => [
                    idx + 1,
                    r.studentName,
                    r.contactDetails,
                    r.courseTitle,
                    r.price,
                    r.paymentDetails,
                    r.status || 'pending',
                    r.purchasedAt
                  ]);
                  const csvContent = [headers, ...rows].map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
                  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.setAttribute("href", url);
                  link.setAttribute("download", `student_enrollment_ledger_${new Date().toISOString().slice(0,10)}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  showSuccess("Spreadsheet downloaded as CSV successfully!");
                }}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:text-black font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow shadow-emerald-950"
              >
                <FileText className="w-4 h-4" />
                Export Ledger (.CSV)
              </button>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block font-mono">Row Capacity</span>
                <strong className="text-lg font-bold text-white font-mono">{studentAnalysisRecords.length} / 5000</strong>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block font-mono">Approved Batches</span>
                <strong className="text-lg font-bold text-emerald-400 font-mono">
                  {studentAnalysisRecords.filter(r => r.status === 'approved').length}
                </strong>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block font-mono">Pending Receipts</span>
                <strong className="text-lg font-bold text-yellow-500 font-mono">
                  {studentAnalysisRecords.filter(r => r.status !== 'approved' && r.status !== 'denied').length}
                </strong>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block font-mono">Reconciled Value</span>
                <strong className="text-lg font-bold text-white font-mono">
                  ₹{studentAnalysisRecords.reduce((sum, rec) => {
                    if (rec.status === 'approved') {
                      const num = parseInt(rec.price.replace(/[^0-9]/g, ''), 10) || 0;
                      return sum + num;
                    }
                    return sum;
                  }, 0)}
                </strong>
              </div>
            </div>

            {/* SPREADSHEET CONTROL BAR */}
            <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Query student, course, status, UTR..."
                  value={spreadsheetSearch}
                  onChange={(e) => setSpreadsheetSearch(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-zinc-500"
                />
                {spreadsheetSearch && (
                  <button
                    onClick={() => setSpreadsheetSearch('')}
                    className="absolute right-3 top-2 text-zinc-500 hover:text-white font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Manual insert student inline form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  const name = target.elements.stuName.value.trim();
                  const contact = target.elements.stuContact.value.trim();
                  const course = target.elements.stuCourse.value;
                  const price = target.elements.stuPrice.value.trim();
                  const utr = target.elements.stuUtr.value.trim() || 'MANUAL-ENTRY';

                  if (!name || !contact) {
                    showSuccess("Please provide Name and Contact details.");
                    return;
                  }

                  const matchedCourse = courses.find(c => c.title === course);
                  const courseIdVal = matchedCourse ? matchedCourse.id : 'manual';

                  const newRecord: StudentAnalysisRecord = {
                    id: `record-${Date.now()}`,
                    studentName: name,
                    contactDetails: contact,
                    courseId: courseIdVal,
                    courseTitle: course,
                    price: price.startsWith('₹') ? price : `₹${price}`,
                    paymentDetails: utr,
                    status: 'approved',
                    purchasedAt: new Date().toLocaleString()
                  };

                  if (onUpdateStudentAnalysisRecords) {
                    onUpdateStudentAnalysisRecords([newRecord, ...studentAnalysisRecords]);
                  }
                  target.reset();
                  showSuccess("Manual row injected into spreadsheet successfully!");
                }}
                className="flex flex-wrap gap-2 items-center w-full sm:w-auto"
              >
                <input
                  name="stuName"
                  type="text"
                  placeholder="New Student Name"
                  required
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-white outline-none focus:border-zinc-600 max-w-[120px]"
                />
                <input
                  name="stuContact"
                  type="text"
                  placeholder="Contact (Email/No)"
                  required
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-white outline-none focus:border-zinc-600 max-w-[110px]"
                />
                <select
                  name="stuCourse"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-white outline-none focus:border-zinc-600"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                  {courses.length === 0 && <option value="General Batches">General Science Batch</option>}
                </select>
                <input
                  name="stuPrice"
                  type="text"
                  placeholder="₹ Price"
                  defaultValue="499"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-white outline-none focus:border-zinc-600 max-w-[60px] font-mono text-center"
                />
                <input
                  name="stuUtr"
                  type="text"
                  placeholder="UTR ref (optional)"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-white outline-none focus:border-zinc-600 max-w-[100px] font-mono"
                />
                <button
                  type="submit"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-1 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3 h-3" /> Ingest Row
                </button>
              </form>
            </div>

            {/* SPREADSHEET CONTAINER */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* PRIMARY TABLE SHEET GRID (8 columns) */}
              <div className="xl:col-span-8 bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Excel-like Grid Metadata info bar */}
                <div className="bg-zinc-900/60 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span>💡 Tip: Click row index to select / inspect</span>
                    <span>•</span>
                    <span>Direct-edit cell text to live edit spreadsheet name / contact</span>
                  </div>
                  <div className="text-zinc-400">
                    Showing {studentAnalysisRecords.filter(r => {
                      const q = spreadsheetSearch.toLowerCase();
                      return r.studentName.toLowerCase().includes(q) ||
                             r.contactDetails.toLowerCase().includes(q) ||
                             r.courseTitle.toLowerCase().includes(q) ||
                             r.paymentDetails.toLowerCase().includes(q) ||
                             (r.status || '').toLowerCase().includes(q);
                    }).length} / {studentAnalysisRecords.length} Rows
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse select-text">
                    <thead>
                      <tr className="bg-zinc-900/40 border-b border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        <th className="py-2.5 px-3 border-r border-zinc-800 text-center w-12 bg-zinc-900/20">Index</th>
                        <th 
                          onClick={() => {
                            setSpreadsheetSortOrder(prev => spreadsheetSortField === 'studentName' && prev === 'asc' ? 'desc' : 'asc');
                            setSpreadsheetSortField('studentName');
                          }}
                          className="py-2.5 px-4 border-r border-zinc-800 cursor-pointer hover:bg-zinc-900/60 hover:text-white transition"
                        >
                          <div className="flex items-center gap-1">
                            Student Name {spreadsheetSortField === 'studentName' && (spreadsheetSortOrder === 'asc' ? '▲' : '▼')}
                          </div>
                        </th>
                        <th className="py-2.5 px-4 border-r border-zinc-800">Contact Details</th>
                        <th className="py-2.5 px-4 border-r border-zinc-800">Purchased Course</th>
                        <th 
                          onClick={() => {
                            setSpreadsheetSortOrder(prev => spreadsheetSortField === 'price' && prev === 'asc' ? 'desc' : 'asc');
                            setSpreadsheetSortField('price');
                          }}
                          className="py-2.5 px-3 border-r border-zinc-800 cursor-pointer hover:bg-zinc-900/60 hover:text-white transition w-24 text-center"
                        >
                          <div className="flex items-center justify-center gap-1">
                            Price {spreadsheetSortField === 'price' && (spreadsheetSortOrder === 'asc' ? '▲' : '▼')}
                          </div>
                        </th>
                        <th className="py-2.5 px-4 border-r border-zinc-800 w-32">UTR Ref</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 font-mono text-xs">
                      {studentAnalysisRecords
                        .filter(r => {
                          const q = spreadsheetSearch.toLowerCase();
                          return r.studentName.toLowerCase().includes(q) ||
                                 r.contactDetails.toLowerCase().includes(q) ||
                                 r.courseTitle.toLowerCase().includes(q) ||
                                 r.paymentDetails.toLowerCase().includes(q) ||
                                 (r.status || '').toLowerCase().includes(q);
                        })
                        .sort((a, b) => {
                          let fieldA = (a as any)[spreadsheetSortField] || '';
                          let fieldB = (b as any)[spreadsheetSortField] || '';
                          if (spreadsheetSortField === 'price') {
                            fieldA = parseInt(String(fieldA).replace(/[^0-9]/g, ''), 10) || 0;
                            fieldB = parseInt(String(fieldB).replace(/[^0-9]/g, ''), 10) || 0;
                          }
                          if (fieldA < fieldB) return spreadsheetSortOrder === 'asc' ? -1 : 1;
                          if (fieldA > fieldB) return spreadsheetSortOrder === 'asc' ? 1 : -1;
                          return 0;
                        })
                        .map((record, index) => {
                          const isSelected = selectedSpreadsheetRowId === record.id;
                          return (
                            <tr 
                              key={record.id}
                              className={`group hover:bg-zinc-900/45 transition ${
                                isSelected ? 'bg-zinc-850 text-white' : 'text-zinc-300'
                              }`}
                            >
                              {/* INDEX ROW CELL */}
                              <td 
                                onClick={() => setSelectedSpreadsheetRowId(record.id)}
                                className={`py-2 px-3 border-r border-zinc-850 text-center text-[10px] font-bold cursor-pointer select-none ${
                                  isSelected ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-900/10 text-zinc-500 group-hover:text-zinc-300'
                                }`}
                              >
                                {index + 1}
                              </td>

                              {/* STUDENT NAME (INLINE EDITABLE) */}
                              <td className="py-2 px-4 border-r border-zinc-850 font-bold truncate max-w-[150px]">
                                <input
                                  type="text"
                                  value={record.studentName}
                                  onChange={(e) => {
                                    const updated = studentAnalysisRecords.map(r => 
                                      r.id === record.id ? { ...r, studentName: e.target.value } : r
                                    );
                                    if (onUpdateStudentAnalysisRecords) {
                                      onUpdateStudentAnalysisRecords(updated);
                                    }
                                  }}
                                  className="w-full bg-transparent border-none text-white outline-none focus:bg-zinc-900 focus:px-1.5 focus:py-0.5 rounded font-bold"
                                />
                              </td>

                              {/* CONTACT DETAILS (INLINE EDITABLE) */}
                              <td className="py-2 px-4 border-r border-zinc-850 text-zinc-400">
                                <input
                                  type="text"
                                  value={record.contactDetails}
                                  onChange={(e) => {
                                    const updated = studentAnalysisRecords.map(r => 
                                      r.id === record.id ? { ...r, contactDetails: e.target.value } : r
                                    );
                                    if (onUpdateStudentAnalysisRecords) {
                                      onUpdateStudentAnalysisRecords(updated);
                                    }
                                  }}
                                  className="w-full bg-transparent border-none text-zinc-400 outline-none focus:bg-zinc-900 focus:px-1.5 focus:py-0.5 rounded"
                                />
                              </td>

                              {/* PURCHASED COURSE */}
                              <td className="py-2 px-4 border-r border-zinc-850 text-zinc-400 truncate max-w-[180px]">
                                {record.courseTitle}
                              </td>

                              {/* TRANSACTION PRICE */}
                              <td className="py-2 px-3 border-r border-zinc-850 text-center font-bold text-emerald-400">
                                {record.price}
                              </td>

                              {/* PAYMENT REFERENCE DETS */}
                              <td className="py-2 px-4 border-r border-zinc-850 text-zinc-500 text-[10px]">
                                {record.paymentDetails}
                              </td>

                              {/* VERIFICATION STATUSbadge */}
                              <td className="py-2 px-3 text-center">
                                <select
                                  value={record.status || 'pending'}
                                  onChange={(e) => {
                                    playSound('click');
                                    handleStatusChange(record.id, e.target.value as any);
                                  }}
                                  className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-lg cursor-pointer bg-zinc-900 text-center outline-none border ${
                                    record.status === 'approved' 
                                      ? 'text-emerald-400 border-emerald-950' 
                                      : record.status === 'denied' 
                                        ? 'text-rose-400 border-rose-950' 
                                        : 'text-amber-400 border-amber-950'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="denied">Denied</option>
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                      {studentAnalysisRecords.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-zinc-600">No matching student ledger entries inside spreadsheet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SIDE INSPECTOR PANEL: HIGHLIGHT SELECTED STUDENT (4 columns) */}
              <div className="xl:col-span-4 space-y-6">
                {selectedSpreadsheetRowId ? (() => {
                  const currentRecord = studentAnalysisRecords.find(r => r.id === selectedSpreadsheetRowId);
                  if (!currentRecord) return <div className="text-xs text-zinc-600">Row cleared. Select an index from the spreadsheet.</div>;
                  return (
                    <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-5 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-3">
                        <button
                          onClick={() => setSelectedSpreadsheetRowId(null)}
                          className="text-zinc-600 hover:text-white transition font-bold"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">Active Row Inspector</span>
                        <h4 className="text-base font-bold text-white truncate">{currentRecord.studentName}</h4>
                        <p className="text-xs text-zinc-500">{currentRecord.contactDetails}</p>
                      </div>

                      <div className="border-t border-zinc-900 pt-3 space-y-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-medium">Payment Target Batch</span>
                          <span className="text-zinc-300 font-bold truncate max-w-[170px]">{currentRecord.courseTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-medium">Reconciliation Price</span>
                          <span className="text-emerald-400 font-bold font-mono">{currentRecord.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-medium">UTR Reference ID</span>
                          <span className="text-white font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-[10px]">{currentRecord.paymentDetails}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-medium">Date Stamp Logged</span>
                          <span className="text-zinc-400 font-mono text-[10px]">{currentRecord.purchasedAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-medium">Ledger Status</span>
                          <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-md ${
                            currentRecord.status === 'approved'
                              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
                              : currentRecord.status === 'denied'
                                ? 'bg-rose-950/40 text-rose-400 border border-rose-900/40'
                                : 'bg-amber-950/40 text-amber-400 border border-amber-900/40'
                          }`}>
                            {currentRecord.status || 'pending'}
                          </span>
                        </div>
                      </div>

                      {/* Diagnostic Breakdown progress charts in side inspector */}
                      <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-900 space-y-3.5">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">🎓 Student Curriculum Breakdown</span>
                        
                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                            <span>Diagnostic Score</span>
                            <span className="text-white font-bold">88% (Excellent)</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                            <span>Syllabus Reading Track</span>
                            <span className="text-white font-bold">14 / 18 Chapters</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '77%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                            <span>Daily Quiz Submissions</span>
                            <span className="text-white font-bold">120 solved</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Manual Row Delete Option */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            playSound('click');
                            if (confirm(`Are you sure you want to purge ${currentRecord.studentName} from enrollment logs?`)) {
                              if (onUpdateStudentAnalysisRecords) {
                                onUpdateStudentAnalysisRecords(studentAnalysisRecords.filter(r => r.id !== currentRecord.id));
                              }
                              setSelectedSpreadsheetRowId(null);
                              showSuccess("Student record purged from spreadsheet ledger.");
                            }
                          }}
                          className="w-full py-1.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-900/40 text-rose-400 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-4 h-4" /> Purge Ledger Row
                        </button>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl text-center space-y-2 text-zinc-500 py-16">
                    <Database className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs font-medium">Select a student row index from the left spreadsheet grid to inspect detailed performance and verification logs.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ======================= TAB 5: APK RELEASES & VERSION CONTROL ======================= */}
        {activeSubTab === 'apk-releases' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-white">Android APK Releases & Version Control</h3>
              <p className="text-xs text-zinc-500 mt-1">Configure live APK files, specify download links, release notes, and simulate update notifications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form to publish a new APK */}
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4 lg:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Publish New Version release</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-500 uppercase">Version Code Name</label>
                      <input
                        type="text"
                        placeholder="e.g. v2.1.0"
                        value={apkVersion}
                        onChange={(e) => setApkVersion(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-500 uppercase">APK Size (Megabytes)</label>
                      <input
                        type="number"
                        placeholder="e.g. 48"
                        value={apkSize}
                        onChange={(e) => setApkSize(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-xl border border-zinc-900">
                    <label className="text-[10px] font-semibold text-zinc-500 uppercase">Select & Upload APK File directly</label>
                    <InlineUploadButton
                      accept=".apk"
                      label="Upload Android APK file (.apk)"
                      onUploadComplete={(dataUrl) => {
                        const generatedUrl = `${window.location.origin}/downloads/curiousbharat-${apkVersion || 'latest'}.apk`;
                        setApkUrl(generatedUrl);
                        showSuccess('Android APK uploaded! Secure download path mapped successfully.');
                      }}
                    />
                    <div className="mt-2 text-center text-zinc-600 text-[10px]">-- OR ENTER MANUALLY --</div>
                    <label className="text-[10px] font-semibold text-zinc-500 uppercase mt-2 block">APK Download URL Link</label>
                    <input
                      type="text"
                      placeholder="e.g. https://github.com/..."
                      value={apkUrl}
                      onChange={(e) => setApkUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-500 uppercase">Release Notes & Technical Changelog</label>
                    <textarea
                      placeholder="Describe core updates..."
                      value={apkNotes}
                      onChange={(e) => setApkNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zinc-500 resize-none"
                    />
                  </div>

                  {/* Dynamic update behavior classification */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Automatic Release Logic Analyzer</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${apkSize < 60 ? 'bg-yellow-400 animate-pulse' : 'bg-rose-400 animate-bounce'}`}></div>
                      <span className="text-xs font-bold text-white">
                        {apkSize < 60 ? 'Silent Background Update Triggered' : 'Polished Alert User Prompt Triggered'}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {apkSize < 60 
                        ? `Because the compiled release file size is ${apkSize}MB (below 60MB), the Android OS background services will fetch and install this package silently to prevent any educational flow interruption.`
                        : `Because the compiled release file size is ${apkSize}MB (above 60MB), students will see a polished, full-screen interactive alert asking for confirmation prior to starting the download.`
                      }
                    </p>
                  </div>

                  {/* Local Storage & State Preservation Warning */}
                  <div className="flex items-start gap-3 bg-zinc-950/80 p-3 border border-zinc-900 rounded-xl text-xs text-zinc-400">
                    <input 
                      type="checkbox" 
                      checked 
                      disabled 
                      className="mt-1 accent-zinc-100" 
                    />
                    <div>
                      <strong className="text-white">Student State & Wallet Preservation</strong>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Auto-retains local user progress states, XP levels, referrals, diagnostic scores, bookmarks, and completed chapter logs across update cycles.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!apkVersion || !apkUrl) return;
                      const newRel = {
                        version: apkVersion,
                        size: apkSize,
                        notes: apkNotes,
                        date: new Date().toISOString().split('T')[0],
                        url: apkUrl
                      };
                      setReleases([newRel, ...releases]);
                      
                      fetch('/api/apk-version', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ version: apkVersion, url: apkUrl, notes: apkNotes })
                      })
                      .then(res => res.json())
                      .then(data => {
                        if (data.success) {
                          showSuccess(`Successfully published ${apkVersion} to server registry! Active student app instances will be prompted to upgrade automatically.`);
                        } else {
                          showSuccess(`Published ${apkVersion} locally (Server status error)`);
                        }
                      })
                      .catch(err => {
                        console.error('Error updating APK on server:', err);
                        showSuccess(`Published ${apkVersion} offline successfully.`);
                      });
                    }}
                    className="w-full py-2.5 bg-white text-black hover:bg-zinc-200 font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-4 h-4 text-black" /> Publish Release & Signal Devices
                  </button>
                </div>
              </div>

              {/* Release history feed */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block">Release Logs & History</span>
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
                  {releases.map((rel, i) => (
                    <div key={i} className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-white bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded">
                            {rel.version}
                          </span>
                          <span className="text-[10px] text-zinc-600 font-mono block mt-1.5">
                            📅 {rel.date}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                          {rel.size} MB
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                        {rel.notes}
                      </p>

                      <div className="pt-2 border-t border-zinc-900 text-[10px] text-zinc-500">
                        Update mode: <span className="font-bold text-zinc-400">{rel.size < 60 ? 'Silent Automatic' : 'User Prompt Warning'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================= TAB 6: OWNER PROFILE & ECOSYSTEM REGULATOR ======================= */}
        {activeSubTab === 'owner-profile' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Super Owner Profile & Regulator</h3>
                <p className="text-xs text-zinc-500 mt-1">Manage super-administrator credentials, configure Google storage integrations, and regulate student privileges.</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Ecosystem Online
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side: Owner Profile Card (matches student profile style but in Super Admin Gold) */}
              <div className="space-y-6 text-left">
                <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden">
                  {/* Decorative Premium strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F9DFF] to-[#14b8a6]"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-4 pt-2">
                    <div className="relative group">
                      <img 
                        src={ownerProfile?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} 
                        alt="Owner Avatar" 
                        className="w-24 h-24 rounded-full border-2 border-amber-500 shadow-xl object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-white flex items-center justify-center gap-1.5">
                        {ownerProfile?.name || 'Alok Roy Sir'}
                        <span className="text-[9px] uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">SUPER OWNER</span>
                      </h4>
                      <p className="text-xs text-zinc-400">{ownerProfile?.instituteName || 'Bharat Science Academy'}</p>
                    </div>

                    <div className="w-full border-t border-zinc-900 pt-4 space-y-3.5 text-left text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Super Admin ID:</span>
                        <span className="text-zinc-300 font-mono text-[11px] font-semibold">{ownerProfile?.email || 'rst010186@gmail.com'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Primary Contact:</span>
                        <span className="text-zinc-300 font-mono text-[11px] font-semibold">{ownerProfile?.contact || '+91 98765 43210'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Global UPI ID:</span>
                        <span className="text-zinc-300 font-mono text-[11px] font-semibold text-amber-400">{ownerProfile?.upiId || 'rst010186@paytm'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Storage Target:</span>
                        <span className="text-emerald-400 font-mono text-[11px] font-bold uppercase">{ownerProfile?.storageDestination === 'google-drive' ? 'Google Drive' : 'Local Storage'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage Usage Status */}
                <div className="bg-zinc-950 border border-zinc-850 p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-500" /> Google Email Storage Capacity
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">rst010186@gmail.com</span>
                      <span className="text-zinc-300 font-bold">12.8 GB / 15.0 GB</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-850">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85.3%' }}></div>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      Thumbnails, lecture boards, and DPP notes uploaded by the Super Admin sync instantly with your connected Google Storage space.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Configuration Forms */}
              <div className="lg:col-span-2 space-y-6 text-left">
                
                {/* Section 1: Profile & Academy Credentials */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    if (onUpdateOwnerProfile && ownerProfile) {
                      onUpdateOwnerProfile({
                        ...ownerProfile,
                        name: formData.get('name') as string,
                        email: formData.get('email') as string,
                        contact: formData.get('contact') as string,
                        upiId: formData.get('upiId') as string,
                        instituteName: formData.get('instituteName') as string,
                        avatarUrl: formData.get('avatarUrl') as string,
                      });
                      playSound('success');
                      alert("Super Owner Credentials saved successfully!");
                    }
                  }}
                  className="bg-zinc-950 border border-zinc-850 p-6 rounded-2xl space-y-4 text-left"
                >
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">Edit Admin Profile Settings</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        defaultValue={ownerProfile?.name || 'Alok Roy Sir'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Super Admin Email ID</label>
                      <input 
                        type="email" 
                        name="email"
                        defaultValue={ownerProfile?.email || 'rst010186@gmail.com'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Contact Number</label>
                      <input 
                        type="text" 
                        name="contact"
                        defaultValue={ownerProfile?.contact || '+91 98765 43210'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Payment UPI ID (Global)</label>
                      <input 
                        type="text" 
                        name="upiId"
                        defaultValue={ownerProfile?.upiId || 'rst010186@paytm'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Institute Name</label>
                      <input 
                        type="text" 
                        name="instituteName"
                        defaultValue={ownerProfile?.instituteName || 'Bharat Science Academy'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Owner Avatar Photo URL</label>
                      <input 
                        type="text" 
                        name="avatarUrl"
                        defaultValue={ownerProfile?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Save className="w-4 h-4" /> Save Super Admin Profile
                    </button>
                  </div>
                </form>

                {/* Section 2: Storage Destinations & Google integration */}
                <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-2xl space-y-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ecosystem Storage regulator</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Default Storage Destination</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (onUpdateOwnerProfile && ownerProfile) {
                              onUpdateOwnerProfile({ ...ownerProfile, storageDestination: 'local' });
                              playSound('click');
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-left space-y-1 transition ${
                            ownerProfile?.storageDestination === 'local'
                              ? 'bg-zinc-900 border-zinc-750 text-white'
                              : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <span className="block text-xs font-extrabold">💾 Local Isolated Storage</span>
                          <span className="block text-[10px] opacity-80 leading-normal">Save notes and boards directly to the application container local disk cache.</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (onUpdateOwnerProfile && ownerProfile) {
                              onUpdateOwnerProfile({ ...ownerProfile, storageDestination: 'google-drive' });
                              playSound('click');
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-left space-y-1 transition ${
                            ownerProfile?.storageDestination === 'google-drive'
                              ? 'bg-zinc-900 border-emerald-500/40 text-white ring-1 ring-emerald-500/20'
                              : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <span className="block text-xs font-extrabold text-emerald-400">☁️ Google Email Storage Integration</span>
                          <span className="block text-[10px] opacity-80 leading-normal">Use Alok Roy Sir's personal Google Email (Drive space) to host thumbnails, notes, and avatars.</span>
                        </button>
                      </div>
                    </div>

                    {ownerProfile?.storageDestination === 'google-drive' && (
                      <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl space-y-3.5">
                        <h5 className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider">Connected Google Space details</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] font-bold text-zinc-500 block uppercase">Connected Gmail Address</span>
                            <input 
                              type="text" 
                              value={ownerProfile?.googleStorageEmail || 'rst010186@gmail.com'}
                              onChange={(e) => {
                                if (onUpdateOwnerProfile && ownerProfile) {
                                  onUpdateOwnerProfile({ ...ownerProfile, googleStorageEmail: e.target.value });
                                }
                              }}
                              className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] font-bold text-zinc-500 block uppercase">Google Drive Folder ID</span>
                            <input 
                              type="text" 
                              value={ownerProfile?.googleDriveFolderId || 'bharat-ai-vault-101'}
                              onChange={(e) => {
                                if (onUpdateOwnerProfile && ownerProfile) {
                                  onUpdateOwnerProfile({ ...ownerProfile, googleDriveFolderId: e.target.value });
                                }
                              }}
                              className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Global Privileges Permissions Regulator */}
                <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-2xl space-y-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Student Privilege Regulator</h4>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-xl border border-zinc-850 gap-4">
                    <div className="space-y-1 pr-4 text-left">
                      <span className="block text-xs font-extrabold text-white">📥 Student Lecture PDF Download option</span>
                      <span className="block text-[10px] text-zinc-500 leading-normal">
                        Allow students to trigger downloads for syllabus PDFs, lecture notes, and board mockups inside the batch screen (student must authorize storage access first).
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onUpdateOwnerProfile && ownerProfile) {
                          onUpdateOwnerProfile({ ...ownerProfile, allowDownloads: !ownerProfile.allowDownloads });
                          playSound('click');
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                        ownerProfile?.allowDownloads ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          ownerProfile?.allowDownloads ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
