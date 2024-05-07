import React, { useState, useEffect, useRef } from 'react';
import { Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Menu, IconButton, DialogContentText, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import InfoIcon from '@mui/icons-material/Info';

function QuestSelection({ hunter, deleteHunter }) {
  const [menuBottunOpen, setmenuBottunDialogOpen] = useState(null);
  const [instrAnchorEl, setinstrAnchorEl] = useState(null);
  const [overviewOpen, setOverviewDialogOpen] = useState(null);
  const [reloadBottunOpen, setreloadBottunDialogOpen] = useState(null);
  const [moveBottunOpen, setmoveBottunDialogOpen] = useState(null);
  const [commentBottunOpen , setCommentBottunDialogOpen] = useState(null);
  const [questacopen, setquestacDialogOpen] = useState(null);
  const [questofropen, setquestofrDialogopen] = useState(null);
  const [rankDefinitionOpen,setRankDefinitionOpen] = useState(null);
  const [questediopen, setquestediDialogOpen] = useState(null);
  const [questcmpopen, setquestcmpDialogOpen] = useState(null);
  const [questdelopen, setquestdelDialogOpen] = useState(null);
  const [recopen, setrecDialogOpen] = useState(null);
  const [recallopen,setrecallDialogOpen] = useState(null);
  const [rankopen,setrankDialogOpen] = useState(null);
  const [privacyPolicyOpen,setPrivacyPolicyOpen] = useState(null);
  const [acdelopen, setacdelDialogOpen] = useState(null);
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [questAcceptorAnchorEl, setQuestAcceptorAnchorEl] = useState(null);
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [rankCounts, setRankCounts] = useState({});
  const buttonRef = useRef(null);
  const [isAddQuestDialogOpen, setIsAddQuestDialogOpen] = useState(false);
  const [selectedEditQuestDialogOpen, setSelectedEditQuestDialogOpen] = useState(false);
  const [editQuestDialogOpen, setEditQuestDialogOpen] = useState(false)
  const [completeQuestDialogOpen, setCompleteQuestDialogOpen] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const [selectedDeleteQuest, setSelectedDeleteQuest] = useState('');
  const [selectedEditQuest, setSelectedEditQuest] = useState('');
  const [selectedCompleteQuest, setSelectedCompleteQuest] = useState('');
  const [deleteQuestDialogOpen, setDeleteQuestDialogOpen] = useState(false);
  const [deleteHunterDialogOpen, setDeleteHunterDialogOpen] = useState(false);
  const [addQuestSuccessDialogOpen, setAddQuestSuccessDialogOpen] = useState(false);
  const [deleteQuestSuccessDialogOpen, setDeleteQuestSuccessDialogOpen] = useState(false);
  const [deleteHunterSuccessDialogOpen, setDeleteHunterSuccessDialogOpen] = useState(false);
  const [accpetQuestSuccessDialogOpen, setAccpetQuestSuccessDialogOpen] = useState(false);
  const [questAcceptorDiscardSuccessDialogOpen, setQuestAcceptorDiscardSuccessDialogOpen] = useState(false);
  const [completeQuestSuccessDialogOpen, setCompleteQuestSuccessDialogOpen] = useState(false);
  const [hunterDeleteManagementSuccessDialogOpen, setHunterDeleteManagementSuccessDialogOpen] = useState(false);
  const [acceptQuestManagementDialogOpen, setAcceptQuestManagementDialogOpen] = useState(false);
  const [questAcceptorDiscardManagementDialogOpen, setQuestAcceptorDiscardManagementDialogOpen] = useState(false);
  const [hunterDeleteManagementDialogOpen, setHunterDeleteManagementDialogOpen] = useState(false);
  const [rankingDialogOpen, setRankingDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [threadsDialogOpen, setThreadsDialogOpen] = useState(false);
  const [addThreadDialogOpen, setAddThreadDialogOpen] = useState(false);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);
  const [reenterDialogOpen,setReenterDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [allHunters, setAllHunters] = useState([]);
  const [selectedHunter, setSelectedHunter] = useState(null);
  const [isAllHuntersDialogOpen, setIsAllHuntersDialogOpen] = useState(false);
  const [isIndividualHunterAchievementDialogOpen, setIsIndividualHunterAchievementDialogOpen] = useState(false);
  const [questStatus, setQuestStatus] = useState({});
  const [threads,setThreads] = useState([]); //　スレッドの状態
  const [newThreadTitle,setNewThreadTitle] = useState(''); // 新しいスレッドタイトルを保持
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [selectedThread,setSelectedThread] = useState([]);
  const [threadStatus,setThreadStatus] = useState([]); //既読未読（スレッドIDから）
  const [threadStatusAsQuest, setThreadStatusAsQuest] = useState([]); //既読未読（クエストから）
  const [comments, setComments] = useState([]); // コメントの状態
  const [newCommentText, setNewCommentText] = useState(''); // 新しいコメントのテキストを保持する状態
  const [textLength,setTextLength] = useState('');  //入力されたテキストの文字数
  const [newQuest, setNewQuest] = useState({
    client: '',
    title: '',
    deadline: '',
    capacity: '',
    rank: '',
    overview: '',
  });
  // 編集可能なクエストのデータを格納する状態変数を追加
  const [editableQuestData, setEditableQuestData] = useState({
    client: '',
    title: '',
    deadline: '',
    capacity: '',
    rank: '',
    overview: '',
  });
  // クエストの完了イメージを表示するためのスタイル
  const completedOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/image/completed.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  // 表示ソート用定義
  const rankOrder = {
    "緊急": 1,
    "Sランク": 2,
    "Aランク": 3,
    "Bランク": 4,
    "Cランク": 5,
    "Dランク": 6,
    "Eランク": 7
  };
  const sortedQuests = quests.sort((a, b) => {
    return rankOrder[a.rank] - rankOrder[b.rank];
  });
  // ランキングのソート用定義
  const rankPoints = {
    "緊急": 7,
    "Sランク": 7,
    "Aランク": 5,
    "Bランク": 4,
    "Cランク": 3,
    "Dランク": 2,
    "Eランク": 1
  };
  // ランキングに関する計算
  const calculateScore = (ranks) => {
    return Object.entries(ranks).reduce((totalScore, [rank, count]) => {
      return totalScore + (rankPoints[rank] * count);
    }, 0);
  };
  // ランキングの作成
  const createRanking = (rankCounts) => {
    return Object.entries(rankCounts)
      .map(([hunterName, ranks]) => ({
        hunterName,
        score: calculateScore(ranks),
        ranks
      }))
      .sort((a, b) => b.score - a.score);
  };
  
  

  const scrollToBottom = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
  };

  const handleMainInstrOpen = (event) => {
    setinstrAnchorEl(event.currentTarget);
  };

  const handleMainMenuOpen = (event) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleQuestAcceptorMenuClick = (event) => {
    setQuestAcceptorAnchorEl(event.currentTarget);
  };

  const handleQuestAcceptorMenuClose = () => {
    setQuestAcceptorAnchorEl(null);
  };

  const handleMainInstrClose = () => {
    setinstrAnchorEl(null);
  }

  const handleMainMenuClose = () => {
    setMainAnchorEl(null);
  };

  const handleDeleteQuestChange = (event) => {
    setSelectedDeleteQuest(event.target.value);
  };

  // 選択されたクエストが変更されたときに、対応するクエストのデータを設定
  const handleSelectedEditQuestChange = (event) => {
    const questId = event.target.value;
    const quest = quests.find(q => q.id === questId);
    if (quest) {
      const formattedDeadline = quest.deadline ? convertToDateTimeLocal(quest.deadline) : '';
      setEditableQuestData({
        title: quest.title,
        deadline: formattedDeadline,
        capacity: quest.capacity,
        rank: quest.rank,
        overview: quest.overview,
      });
    }
    setSelectedEditQuest(questId);
  };
  
  const convertToDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm' 形式に変換
  };

  const handleCompleteQuestChange = (event) => {
    setSelectedCompleteQuest(event.target.value);
  };

  const handleDeleteQuestDialogOpen = () => {
    setDeleteQuestDialogOpen(true);
  }

  const handleDeleteQuestDialogClose = () => {
    setDeleteQuestDialogOpen(false);
  }

  const handleDeleteHunterDialogOpen = () => {
    setDeleteHunterDialogOpen(true);
  }

  const handleDeleteHunterDialogClose = () => {
    setDeleteHunterDialogOpen(false);
  }

  const handleSelectedEditQuestDialogOpen = () => {
    setSelectedEditQuestDialogOpen(true);
  }

  const handleSelectedEditQuestDialogClose = () => {
    setSelectedEditQuestDialogOpen(false);
  }

  const handleEditQuestDialogOpen = () => {
    setEditQuestDialogOpen(true);
    setSelectedEditQuestDialogOpen(false);
  }

  const handleEditQuestDialogClose = () => {
    setEditQuestDialogOpen(false);
  }

  const handleCompleteQuestDialogOpen = () => {
    setCompleteQuestDialogOpen(true);
  }

  const handleCompleteQuestDialogClose = () => {
    setCompleteQuestDialogOpen(false);
  }

  const handleCompleteQuestSuccessDialogClose = () => {
    setCompleteQuestSuccessDialogOpen(false);
  }

  const handleHunterDeleteManagementSuccessDialogClose = () => {
    setHunterDeleteManagementSuccessDialogOpen(false);
    setHunterDeleteManagementDialogOpen(false);
  }

  const handleAcceptQuestDialogClose = () => {
    setAccpetQuestSuccessDialogOpen(false);
  }

  const handleQuestAcceptorDiscardDialogClose = () => {
    setQuestAcceptorDiscardSuccessDialogOpen(false);
  }

  const handleCommentsDialogOpen = async () => {
    handleThreadDialogClose();
    handleAddThreadDialogClose();
    setCommentsDialogOpen(true);
  }

  const handleCommentsDialogClose = async () => {
    const threadId = selectedThreadId; // 選択されたスレッドのID    
    const hunterName = hunter;
    const questId = selectedQuest.id;
    try {
        const response = await fetch(`http://localhost:3000/markThreadAsRead/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hunterName, questId ,threadId }), // ハンター名とスレッドIDを送信
        });

        if (!response.ok) {
          setErrorDialogOpen(true);

        }
        // マーク成功時の処理を追加
        fetchThreadStatus();
        setCommentsDialogOpen(false);
    } catch (error) {
        // エラーハンドリング
        setErrorDialogOpen(true);        
    }
  }

  const  handleThreadSelectChange = (event) => {
    if(event){
      setSelectedThreadId(event);
    }
  }

  const handleThreadDialogOpen = () => {
    setThreadsDialogOpen(true);
  }

  const handleThreadDialogClose = () => {
    setThreadsDialogOpen(false);
  }

  const handleAddThreadDialogOpen = () => {
    handleThreadDialogClose();
    setAddThreadDialogOpen(true);
  }

  const handleAddThreadDialogClose = () => {
    setAddThreadDialogOpen(false);
  }

  const handleNewThreadChange = (value) => {
    setNewThreadTitle(value);
  };

  const handleAddQuestDialogOpen = () => {
    setNewQuest({ ...newQuest, client: hunter });
    setIsAddQuestDialogOpen(true);
  };

  const handleCloseAddQuestDialog = () => {
    setIsAddQuestDialogOpen(false);
  };

  const handleNewQuestChange = (field, value) => {
    setNewQuest({ ...newQuest, [field]: value });
    setTextLength(value.length);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  }

  const handleAddQuestSuccessDialogClose = () => {
    setAddQuestSuccessDialogOpen(false);
  }

  const handleDeleteQuestSuccessDialogClose = () => {
    setDeleteQuestSuccessDialogOpen(false);
  }

  const handleDeleteHunterSuccessDialogClose = () => {
    setDeleteHunterSuccessDialogOpen(false);
    deleteHunter(true); // 保持しているセッション情報をフラグによって疑似的に破棄
  }

  const handleAcceptQuestManagementDialogClose = () => {
    setAcceptQuestManagementDialogOpen(false);
  }
  
  const handleQuestAcceptorDiscardManagementDialogClose = () => {
    setQuestAcceptorDiscardManagementDialogOpen(false);
  }

  const handleHunterDeleteManagementDialogOpen = () => {
    fetchAllHunters();
    setHunterDeleteManagementDialogOpen(true);
  }

  const handleHunterDeleteManagementDialogClose = () => {
    setHunterDeleteManagementDialogOpen(false);
  }

  const handleRankingDialogClose = () => {
    setRankingDialogOpen(false);
  }

  const handleOverviewDialogOpen = () => {
    setOverviewDialogOpen(true);
  }

  const handleOverviewDialogClose = () => {
    setOverviewDialogOpen(false);
  }

  const handlereloadBottunDialogOpen = () => {
    setreloadBottunDialogOpen(true);
  }

  const handlereloadBottunDialogClose = () => {
    setreloadBottunDialogOpen(false);
  }

  const handlemenuBottunDialogOpen = () => {
    setmenuBottunDialogOpen(true);
  }

  const handlemenuBottunDialogClose = () => {
    setmenuBottunDialogOpen(false);
  }
  const handlemoveBottunDialogOpen = () => {
    setmoveBottunDialogOpen(true)
  }
  const handleCommentBottunDialogOpen = () => {
    setCommentBottunDialogOpen(true);
  }
  const handlemoveBottunDialogClose = () => {
    setmoveBottunDialogOpen(false)
  }
  const handleCommentBottunDialogClose = () => {
    setCommentBottunDialogOpen(false);
  }
  const handlequestacDialogOpen = () => {
    setquestacDialogOpen(true)
  }
  const handlequestacDialogClose = () => {
    setquestacDialogOpen(false)
  }
  const handlequestofrDialogOpen = () => {
    setquestofrDialogopen(true)
  }
  const handlequestofrDialogClose = () => {
    setquestofrDialogopen(false)
  }
  const handleRankDefinitionDialogOpen = () => {
    setRankDefinitionOpen(true);
  }
  const handleRankDefinitionDialogClose = () => {
    setRankDefinitionOpen(false);
  }
  const handlequestediDialogOpen = () => {
    setquestediDialogOpen(true)
  }
  const handlequestediDialogClose = () => {
    setquestediDialogOpen(false)
  }
  const handlequestcmpDialogOpen = () => {
    setquestcmpDialogOpen(true)
  }
  const handlequestcmpDialogClose = () => {
    setquestcmpDialogOpen(false)
  }
  const handlequestdelDialogOpen = () => {
    setquestdelDialogOpen(true)
  }
  const handlequestdelDialogClose = () => {
    setquestdelDialogOpen(false)
  }
  const handlerecDialogOpen = () => {
    setrecDialogOpen(true)
  }
  const handlerecDialogClose = () => {
    setrecDialogOpen(false)
  }
  const handlerecallDialogOpen = () => {
    setrecallDialogOpen(true)
  }
  const handlerecallDialogClose = () => {
    setrecallDialogOpen(false)
  }
  const handlerankDialogOpen = () => {
    setrankDialogOpen(true)
  }
  const handlerankDialogClose = () => {
    setrankDialogOpen(false)
  }
  const handlePrivacyPolicyDialogOpen = () => {
    setPrivacyPolicyOpen(true);
  }
  const handlePrivacyPolicyDialogClose = () => {
    setPrivacyPolicyOpen(false);
  }
  const handleacdelDialogOpen = () => {
    setacdelDialogOpen(true)
  }
  const handleacdelDialogClose = () => {
    setacdelDialogOpen(false)
  }

// 全ユーザーのユーザーネームを取得する関数
const fetchAllHunters = async () => {
  try {
    const response = await fetch('http://localhost:3000/getHunters/');
    if (!response.ok) {
      setErrorDialogOpen(true);
    }
    const data = await response.json();
    setAllHunters(data);
  } catch (error) {
    setErrorDialogOpen(true);
  }
};

// 特定のユーザーの実績を表示する関数
const handleHunterClick = async (hunterName) => {
  handleAllHuntersDialogClose();
  setSelectedHunter(hunterName);
  setIsIndividualHunterAchievementDialogOpen(true);

  // 実績データを取得
  const response = await fetch(`http://localhost:3000/getAchievements/${hunterName}`);
  if (response.ok) {
    const data = await response.json();
    setAchievements(data);
  } else {
    setErrorDialogOpen(true);
  }
};

const handleHunterSelectChange = (event) => {
  setSelectedHunter(event.target.value);
};

const handleAllHuntersDialogOpen = () => {
  fetchAllHunters();
  setIsAllHuntersDialogOpen(true);
};

const handleAcceptQuestManagementDialogOpen = () => {
  fetchAllHunters();
  setAcceptQuestManagementDialogOpen(true);
};

const handleQuestAcceptorDiscardManagementDialogOpen = () => {
  fetchAllHunters();
  setQuestAcceptorDiscardManagementDialogOpen(true);
};

const handleRankingDialogOpen = () => {
  fetchAllRanksCount();
  setRankingDialogOpen(true);
}

const handleAllHuntersDialogClose = () => {
  setIsAllHuntersDialogOpen(false);
};

const handleIndividualHunterAchievementDialogClose = () => {
  setIsIndividualHunterAchievementDialogOpen(false);
};

  // クエストの削除を処理する関数
  const handleDeleteQuest = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteQuest/${selectedDeleteQuest}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteQuestSuccessDialogOpen(true);
        // クエストリストを更新するために再取得する
        fetchQuests();
        setSelectedQuest(null);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }

    handleDeleteQuestDialogClose();
  };

  const handleDeleteHunter = async (hunterName) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteHunter/${hunterName}/`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        if (hunter === 'ALL') {
          setHunterDeleteManagementSuccessDialogOpen(true);
        } else {
          setDeleteHunterSuccessDialogOpen(true);
        }
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  
    handleDeleteHunterDialogClose();
  };

  // クエストを未読にする関数
  const markQuestAsUnread = async (questId) => {
    try {
      const response = await fetch('http://localhost:3000/markQuestAsUnread/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questId }),
      });
  
      if (response.ok) {
        // 成功時は無視
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  // クエストを編集する関数
  const handleEditQuest = async () => {
    try {
      const response = await fetch(`http://localhost:3000/updateQuest/${selectedEditQuest}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableQuestData),
      });
  
      if (response.ok) {
        // 更新成功時の処理
        markQuestAsUnread(selectedEditQuest);
        setAddQuestSuccessDialogOpen(true);
        fetchQuests();
        fetchQuestStatus();
        setSelectedQuest(null);
      } else {
        // エラー処理
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    }
    handleEditQuestDialogClose();
  };

  // クエストを完了する関数
  const handleCompleteQuest = async () => {
    try {
      const response = await fetch('http://localhost:3000/completeQuest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quest_id: selectedQuest.id }),
      });

      if (response.ok) {
        markQuestAsUnread(selectedQuest.id);
        setCompleteQuestSuccessDialogOpen(true);
        handleCompleteQuestDialogClose();
        fetchQuests();
        fetchQuestStatus();
        setSelectedQuest(null);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
      setErrorDialogOpen(true);
    }
  };

  // ログイン中のハンターの実績を取得する関数
  const handleIndividualAchievementDialogOpen = async () => {
    setIsAchievementDialogOpen(true);

    // 実績データを取得
    const response = await fetch(`http://localhost:3000/getAchievements/${hunter}`);
    if (response.ok) {
      const data = await response.json();
      setAchievements(data);
    } else {
      setErrorDialogOpen(true);
    }
  };

  // ログイン中のハンターの実績を表示するダイアログを閉じる関数
  const handleIndividualAchievementDialogClose = () => {
    setIsAchievementDialogOpen(false);
  };
  
  // 背景画像のパスを生成する関数
  const getBackgroundImagePath = (index) => {
    return `/image/card_${index}.jpg`;
  };

  // 背景画像のインデックスを更新する関数
  const updateBackgroundImageIndex = () => {
    const newIndex = Math.floor(Math.random() * 6);
    setBackgroundImageIndex(newIndex);
  };

  // クエストを選択し、背景画像のインデックスを更新する関数
  const handleQuestSelect = async (quest) => {

    // クエストを既読としてマークするためのリクエストを送信
    const questId = quest.id; // 選択されたクエストのID    
    const hunterName = hunter;
    try {
        const response = await fetch(`http://localhost:3000/markQuestAsRead/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hunterName, questId }), // ハンター名とクエストIDを送信
        });

        if (!response.ok) {
          setErrorDialogOpen(true);
        }
        // マーク成功時の処理を追加
        fetchQuests();
        fetchQuestStatus();
        setSelectedQuest(quest);
        updateBackgroundImageIndex(); // 背景画像のインデックスを更新
    } catch (error) {
        // エラーハンドリング
        setErrorDialogOpen(true);        
    }
  };

  // UTC日付を「年月日時分」の形式でフォーマットする関数
  const formatDateWithTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };

  // クエストを追加する関数
  const handleSubmitNewQuest = async () => {
    try {
      const response = await fetch('http://localhost:3000/addQuest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuest),
      });
  
      if (response.status === 200) {
        // リクエストが成功した場合        
        handleCloseAddQuestDialog();
        setAddQuestSuccessDialogOpen(true);
        // ここで状態をリセット
        setNewQuest({
          client: '',
          title: '',
          deadline: '',
          capacity: '',
          rank: '',
          overview: '',
        });
        fetchQuests();
        fetchQuestStatus();
        fetchThreadStatus();
      }else if(response.status === 400 && textLength > 1000){
        //概要の文章が長すぎるエラー
        setReenterDialogOpen(true);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  // クエスト受諾する関数
  const handleAcceptQuest = async (hunterName) => {
    try {
      const response = await fetch('http://localhost:3000/acceptQuest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quest_id: selectedQuest.id, hunter_name: hunterName }),
      });

      if (response.ok) {
        // 処理成功の場合
        setAcceptQuestManagementDialogOpen(false);
        setAccpetQuestSuccessDialogOpen(true);
        fetchQuests();
        fetchQuestStatus();
        setSelectedQuest(null)
      } else if (response.status === 400) {
        // 重複エラーの場合
        setIsDuplicateDialogOpen(true);
      } else {
        // その他のエラー
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    }
  };

  // 受諾中のクエストを辞退する関数
  const handleQuestAcceptorDiscard = async (hunterName) => {
    try {
      // 選択中のクエストのhunters属性を分割して配列に変換
      let huntersArray = selectedQuest.hunters.split(' ');
  
      // hunterの値を配列から削除
      huntersArray = huntersArray.filter(h => h !== hunterName);
  
      // 配列を空白で結合して文字列に戻す
      const updatedHunters = huntersArray.join(' ');
  
      // 更新したクエストオブジェクトを作成
      const updatedQuest = {
        ...selectedQuest,
        hunters: updatedHunters
      };
  
      // サーバーに送信してデータベースを更新
      const response = await fetch(`http://localhost:3000/updateQuest/${selectedQuest.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuest)
      });
  
      if (!response.ok) {
        setErrorDialogOpen(true);
      }
      setQuestAcceptorDiscardManagementDialogOpen(false);
      setQuestAcceptorDiscardSuccessDialogOpen(true);
      fetchQuests();
      fetchQuestStatus();
      setSelectedQuest(null);
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  const fetchAllRanksCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/getAllRanksCount');
      if (response.ok) {
        const data = await response.json();
        setRankCounts(data);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {      
      setErrorDialogOpen(true);
    }
  };

  // スレッドを追加する関数
  const handleSubmitNewThreads = async () => {
    handleAddThreadDialogClose();
    if (!newThreadTitle.trim()) return; // 空のスレッドを送信しないようにする
    try {
        const response = await fetch('http://localhost:3000/addThread/', { // 適切なエンドポイントに変更してください
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questId: selectedQuest.id, // スレッドを追加するクエストのID
                hunterName: hunter,
                title: newThreadTitle, // ユーザーが入力したスレッドタイトル
            }),
        });
        
        if (response.ok) {
            // スレッドのリストを再フェッチするか、レスポンスから新しいスレッドを取得して状態を更新する
            await fetchThreadsForSelectedQuest(selectedQuest.id);
            const newThread = await response.json();
            setSelectedThreadId(newThread.id);
            await fetchThreadsForSelectedQuest(selectedQuest.id);
            markThreadAsUnread(newThread.id);
            fetchThreadStatus();
            handleCommentsDialogOpen();
            setNewThreadTitle(''); // 入力フィールドをクリア
        } else {
            // エラーハンドリング
            setErrorDialogOpen(true);
        }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  // 選択されたクエストのスレッドを取得する関数
  const fetchThreadsForSelectedQuest = async (questId) => {
    try {
      const response = await fetch(`http://localhost:3000/getThreads/${questId}/`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data); // APIのレスポンス形式に合わせてください
      } else {
        console.error('スレッドの取得に失敗しました。');
      }
    } catch (error) {
      console.error('スレッドの取得中にエラーが発生しました:', error);
    }
  };

  // 選択されたクエストが変更されたときにスレッドを取得
  useEffect(() => {
    if (selectedQuest) {
      fetchThreadsForSelectedQuest(selectedQuest.id);
    }
  }, [selectedQuest]);

  // コメントを追加する関数
  const handleSubmitNewComments = async () => {
    if (!newCommentText.trim()) return; // 空のコメントを送信しないようにする
    try{
        const response = await fetch('http://localhost:3000/addComments/', { // 適切なエンドポイントに変更してください
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: selectedThreadId, // コメントを追加するスレッドのID
                hunterName: hunter,
                content: newCommentText, // ユーザーが入力したコメントテキスト
            }),
        });
        if (response.ok) {
            markThreadAsUnread(selectedThreadId);
            fetchThreadStatus();
            // コメントのリストを再フェッチするか、レスポンスから新しいコメントを取得して状態を更新する
            await fetchCommentsForSelectedThread(selectedThreadId);
            setNewCommentText(''); // 入力フィールドをクリア
        } else {
            // エラーハンドリング
            setErrorDialogOpen(true);
        }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  //
  const fetchSelectedThreadForId = async (threadId) => {
    const selectedThreadInfo = threads.find(thread => thread.id === threadId);
    setSelectedThread(selectedThreadInfo);
  }
  // 選択されたスレッドのコメントを取得する関数
  const fetchCommentsForSelectedThread = async (threadId) => {
    try {
      const response = await fetch(`http://localhost:3000/getComments/${threadId}/`);
      if (response.ok) {
        const data = await response.json();
        setComments(data); // APIのレスポンス形式に合わせてください
      } else {
        console.error('コメントの取得に失敗しました。');
      }
    } catch (error) {
      console.error('コメントの取得中にエラーが発生しました:', error);
    }
  };

   //選択されたスレッドが変更されたときにコメントを取得
  useEffect(() => {
    if (selectedThreadId) {
      fetchCommentsForSelectedThread(selectedThreadId);
      fetchSelectedThreadForId(selectedThreadId);
    }
  }, [selectedThreadId]);

  const markThreadAsUnread = async (threadId) => {
    try {
      const response = await fetch('http://localhost:3000/markThreadAsUnread/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threadId }),
      });
  
      if (response.ok) {
        // 成功時は無視
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  // APIからスレッドの未読/既読情報を取得する関数
  const fetchThreadStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getReadThreadStatus/${hunter}/`, {
        method: 'GET', // GETリクエストを使用
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setThreadStatus(data); // 状態に未読・既読情報を設定
      } else {
        // エラーハンドリング
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    } 

    try {
      const response = await fetch(`http://localhost:3000/getReadThreadStatusAsQuest/${hunter}/`, {
        method: 'GET', // GETリクエストを使用
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setThreadStatusAsQuest(data); // 状態に未読・既読情報を設定
      } else {
        // エラーハンドリング
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    } 
  }

  // APIから未読/既読情報を取得する関数
  const fetchQuestStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getReadStatus/${hunter}/`, {
        method: 'GET', // GETリクエストを使用
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setQuestStatus(data); // 状態に未読・既読情報を設定
      } else {
        // エラーハンドリング
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    }
  };

  // APIからクエストのリストを取得する関数
  const fetchQuests = async () => {
    try {
      const response = await fetch('http://localhost:3000/getQuest/');
      const data = await response.json();
      if (response.ok) {
        setQuests(data); // 状態にクエストのリストを設定
      } else {
        // エラーハンドリング
        setErrorDialogOpen(true);
      }
    } catch (error) {
      // エラーハンドリング
      setErrorDialogOpen(true);
    }
  };

  // コンポーネントがマウントされたときに実行
  useEffect(() => {
    const fetchData = async () => {
      await fetchQuests();
      await fetchQuestStatus();
      await fetchThreadStatus();
    };
    fetchData();
  }, []);

  // リロードボタンが押されたときにデータを再取得
  const handleReload = () => {
    fetchQuests();
    fetchQuestStatus();
    fetchThreadStatus();
    setSelectedQuest(null);
  };

  return (
      <Grid container spacing={2} style={{ marginTop: '4.0vh' }}>
        <Grid item xs={12} lg={3} style={{ display: 'flex', flexDirection: 'column' }}>
          {sortedQuests.map(quest => (
            <Button
              key={quest.id}
              variant="contained"
              onClick={() => handleQuestSelect(quest)}
              style={{ fontFamily: 'NotoSansCJK-Black',
                       fontSize: '2.5vh',   
                       margin: '1vh', 
                       backgroundColor: 'rgba(101, 67, 33, 0.7)',
                       position: 'relative', 
              }}
            >
              <span style={{  position: 'absolute',
                              top: '0',
                              left: '0',
                              backgroundColor: questStatus[quest.id] === true && threadStatusAsQuest[quest.id] === true ? 'transparent' : 'red',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
              }}>

              </span>
              {quest.title}{'\u00A0\u00A0\u00A0'}
              <span style={{
                color: quest.rank === "緊急" ? 'rgb(255, 60, 60)' : 'inherit',
                textShadow: quest.rank === "緊急" ? '1px 1px black' : 'none',
              }}>
                {quest.rank}
              </span>
            </Button>
          ))}
        </Grid>
        <Grid item xs={0} lg={1}></Grid>
        <Grid item xs={12} lg={7}>
          {selectedQuest && (
            <Card style={{ 
              position: 'relative',
              width: '100%', 
              height: 'auto', 
              margin: '1.2vh',
              right: 'auto',
              top: 'auto',
              backgroundImage: `url(${getBackgroundImagePath(backgroundImageIndex)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              {/* クエストが完了しているかどうかを判定 */}
              {selectedQuest.completed && (
                <div style={completedOverlayStyle} />
              )}
              <CardContent 
                style={{
                    height: '100%',
                    overflow: 'auto'
                  }}
              > 
                <Button
                  ref={buttonRef}
                  aria-label="more"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleQuestAcceptorMenuClick}
                  variant="contained"
                  style={{
                    position: 'absolute',
                    top: 80,
                    right: 20,
                    backgroundImage: 'url(/image/logo_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '0.5vh 2vw',
                    fontFamily: 'NotoSansCJK-Black',
                    fontSize: '1.8vh',
                    color: 'rgb(255,239,213)'
                  }}
                >
                  クエスト受諾者の一覧
                </Button>

                <Menu
                  id="simple-menu"
                  anchorEl={questAcceptorAnchorEl}
                  keepMounted
                  open={Boolean(questAcceptorAnchorEl)}
                  onClose={handleQuestAcceptorMenuClose}
                  PaperProps={{
                    style: {
                      backgroundColor: 'rgb(255,239,213)',
                      width: buttonRef.current ? buttonRef.current.offsetWidth : 'auto',
                      minWidth: buttonRef.current ? buttonRef.current.offsetWidth : 'auto'
                    },
                  }}
                >
                  {selectedQuest.hunters.split(' ').map((acceptor, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleQuestAcceptorMenuClose}
                      style={{
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '1.8vh',
                        padding: '1.0vh',
                      }}
                    >
                      {acceptor}
                    </MenuItem>
                  ))}
                </Menu>

                <Button
                  aria-label="more"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleThreadDialogOpen}
                  variant="contained"
                  style={{
                    position: 'absolute',
                    top: 140,
                    right: 20,
                    backgroundImage: 'url(/image/logo_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '0.5vh 2vw',
                    fontFamily: 'NotoSansCJK-Black',
                    fontSize: '1.8vh',
                    color: 'rgb(255,239,213)'
                  }}
                >
                  <span style={{  position: 'absolute',
                              top: '0',
                              left: '0',
                              backgroundColor: threadStatusAsQuest[selectedQuest.id] ? 'transparent' : 'red',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                  }}></span>
                  コメント＆質問
                </Button>

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  {/* タイトル */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      align="center"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '3.5vh', marginBottom: '2vh' }}
                    >
                      {selectedQuest.title}
                    </Typography>
                  </Grid>

                  {/* 依頼者 */}
                  <Grid container alignItems="flex-start">
                    <Grid item xs={2}>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        依頼者：
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body1"
                        align="left"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        {selectedQuest.client}
                      </Typography>
                    </Grid>

                    {/* 締切 */}
                    <Grid item xs={2}>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        締切：
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body1"
                        align="left"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        {formatDateWithTime(selectedQuest.deadline)}
                      </Typography>
                    </Grid>

                    {/* 定員 */}
                    <Grid item xs={2}>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        定員：
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body1"
                        align="left"
                        style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', marginBottom: '1.2vh' }}
                      >
                        {selectedQuest.capacity}
                      </Typography>
                    </Grid>

                    {/* 概要 */}
                
                      <Grid item xs={2}>
                        <Typography
                          variant="body1"
                          align="right"
                          style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', whiteSpace: 'pre-line', marginBottom: '1.2vh' }}
                        >
                          概要：
                        </Typography>
                      </Grid>
                    
                      <Grid item xs={10}>
                        <Typography
                          variant="body1"
                          align="left"
                          style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh', whiteSpace: 'pre-line', marginleft:"10.0vh", marginBottom: '1.2vh' }}
                        >
                          {selectedQuest.overview}
                        </Typography>
                      </Grid>
                    </Grid>
                  
                </Grid>
                {!selectedQuest.completed && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => hunter === 'ALL' ? handleAcceptQuestManagementDialogOpen() : handleAcceptQuest(hunter)}
                      style={{
                        backgroundImage: 'url(/image/logo_bg.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '1vh 3vw',
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '2.5vh',
                        marginBottom: '1.2vh',
                        width: '100%',
                        color: 'rgb(255,239,213)',
                      }}
                      fullWidth
                    >
                      {hunter === 'ALL' ? 'クエスト受諾者管理' : 'このクエストを受諾する'}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => hunter === 'ALL' ? handleQuestAcceptorDiscardManagementDialogOpen() : handleQuestAcceptorDiscard(hunter)}
                      style={{
                        backgroundImage: 'url(/image/logo_bg.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '1vh 3vw',
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '2.5vh',
                        marginBottom: '1.2vh',
                        width: '100%',
                        color: 'rgb(255,239,213)',
                      }}
                      fullWidth
                    >
                      {hunter === 'ALL' ? 'クエスト辞退管理' : 'このクエストを辞退する'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>

        <Fab
            aria-label="scroll down to bottom"
            onClick={scrollToBottom}
            style={{ 
              zIndex: 1000,
              position: 'fixed',
              right: '2vw',
              bottom: '2vh',
              backgroundColor: 'rgb(255,239,213)',
              borderRadius: '50%',
              padding: '1.5vh'
            }}
        >
          <VerticalAlignBottomIcon style={{ fontSize: '2.5vh' }}/>
        </Fab>

        {/*説明書を開くボタン*/}
        <IconButton
          aria-label="instr"
          aria-controls="long-instr"
          aria-haspopup="true"
          onClick={handleMainInstrOpen}
          style={{
            zIndex: 1000,
            position: 'fixed',
            right: '12vw',
            top: '2vh',
            backgroundColor: 'rgb(255,239,213)',
            borderRadius: '50%',
            padding: '1.5vh'            
          }}
          >
            <InfoIcon style={{ fontSize: '2.5vh'}} />
        </IconButton>
        {/*説明書本体*/}
        <Menu
          id="long-instr"
          anchorEl={instrAnchorEl}
          keepMounted
          open={Boolean(instrAnchorEl)}
          onClose={handleMainInstrClose}
          PaperProps={{
            style: { backgroundColor: 'rgb(255,239,213)'},
          }}
        >
          <Divider />
          <MenuItem 
          onClick={handleOverviewDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>概要</MenuItem>
          <Dialog open={overviewOpen} onClose={handleOverviewDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>概要</DialogTitle>
            <DialogContent>
              <p>ユーザーは「ハンター」と呼ばれ、タスクの協力要請は「クエスト」と呼ばれます。メイン画面のクエストボタンから
                クエストの依頼書を表示し、詳細を確認できます。クエストを引き受けるには受諾ボタンを押します。
                クエスト完了時には得点が与えられ、ランキングに反映されます。
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleOverviewDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlereloadBottunDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>リロードボタン</MenuItem>
          <Dialog open={reloadBottunOpen} onClose={handlereloadBottunDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>リロードボタン</DialogTitle>
            <DialogContent>
              <p>左上にあり、押すと最新情報に更新されます。</p>
              <img src="image/reload.png" style={{width: '50%', height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlereloadBottunDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlemenuBottunDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>メニューボタン</MenuItem>
          <Dialog open={menuBottunOpen} onClose={handlemenuBottunDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>メニューボタン</DialogTitle>
            <DialogContent>
              <p>右上にあり、TNK-Questのクエストの依頼やランキングの閲覧などの主要な機能が実行できます。</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlemenuBottunDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlemoveBottunDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>最下部移動ボタン</MenuItem>
          <Dialog open={moveBottunOpen} onClose={handlemoveBottunDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>最下部移動ボタン</DialogTitle>
            <DialogContent>
              <p>右下にあり、ページ最下部へ移動します。</p>
              <img src="image/movebottum.png" alt="説明テキスト" style={{width: '50%', height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlemoveBottunDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handleCommentBottunDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>コメント機能</MenuItem>
          <Dialog open={commentBottunOpen} onClose={handleCommentBottunDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>コメント機能</DialogTitle>
            <DialogContent>
              <p>クエスト依頼者などに対して質問やコメントをすることができます。</p>
              <p>コメント方法<br/>各クエスト画面からコメント＆質問を選択。</p>
              <img src="image/comment1.png" style={{ width: '50%', height: '60%'}} />
              <p>閲覧したいスレッドを選択してください。</p>
              <img src="image/comment5.png" style={{ width: '50%', height: '60%'}} />
              <p>コメント欄が表示されます。送信したいコメントを入力し、送信ボタンを押してください。</p>
              <img src="image/comment4.png" style={{ width: '50%', height: '60%'}} />
              <p>スレッド選択画面でスレッドの追加を選択すると、新しいスレッドを作成できます。タイトルを入力して追加ボタンを押すと、追加されたコメント欄が開きます。</p>
              <img src="image/comment2.png" style={{ width: '50%', height: '60%'}} />
              <img src="image/comment3.png" style={{ width: '50%', height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCommentBottunDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlequestacDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>クエスト受諾/破棄</MenuItem>
          <Dialog open={questacopen} onClose={handlequestacDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>クエスト受諾/破棄</DialogTitle>
            <DialogContent>
              <p>クエスト依頼書の下部のボタンでクエストのメンバーに参加/脱退ができます。</p>
              <p>クエストに参加する方法は「このクエストを受諾する」を選択することでクエストに参加することができます</p>
              <p>クエストから離脱したい場合は「このクエストを破棄する」を選択することでクエストから離脱することができます</p>
              <img src="image/questac.png" style={{ width: '50%', heigth:'60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlequestacDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlequestofrDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>クエスト依頼</MenuItem>
          <Dialog open={questofropen} onClose={handlequestofrDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>クエスト依頼</DialogTitle>
            <DialogContent>
              <p>クエストを依頼できます。特殊文字は使用できない場合があります</p>
              <p>クエスト依頼方法<br/>右上のメニューバーからクエストの依頼を選択</p>
              <img src="image/ofr_step.png" style={{ width: '50%', height: '60%'}} />
              <p>タイトル・締め切り・定員・クエストランク（作業の難易度）・作業概要を入力。作業概要について、クエスト依頼時は1000文字まで入力可能、それ以上の記入は依頼後にクエスト編集から可能。</p>
              <img src="image/ofr_step2.png" style={{ width: '50%',height: '60%'}} />
              <p>クエストが出現していれば依頼完了です</p>
              <img src="image/ofr_final.png" style={{ width: '50%',height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlequestofrDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handleRankDefinitionDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>ランクの定義</MenuItem>
          <Dialog open={rankDefinitionOpen} onClose={handleRankDefinitionDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>ランクの定義</DialogTitle>
            <DialogContent align="left">
              <p>(緊急クエスト)</p>
              <p>納期が１週間以内の緊急性のあるタスク。<br/><br/></p>
              <p>(Sランク)</p>
              <p>大学院生レベル。1つの研究といえるレベルのタスク。<br/><br/></p>
              <p>(Aランク)</p>
              <p>専門性のある知識や、高度なプログラミング能力、アイデアなどが必要とされるタスク。<br/><br/></p>
              <p>(Bランク)</p>
              <p>クエストクリアで、そのタスクに対する基礎的な知識が身についたといえるもの。<br/><br/></p>
              <p>(Cランク)</p>
              <p>Dランクよりも少し思考力や工夫が必要なタスク。<br/><br/></p>
              <p>(Dランク)</p>
              <p>作業タスクだが、技術を学ぶことができる。<br/><br/></p>
              <p>(Eランク)</p>
              <p>中学生でもできる作業タスク。</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleRankDefinitionDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlequestediDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>クエスト編集</MenuItem>
          <Dialog open={questediopen} onClose={handlequestediDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>クエスト編集</DialogTitle>
            <DialogContent>
              <p>依頼したクエストの編集ができます。編集後は、ハンター全員に未読で表示されます。</p>
              <p>メニューバーからクエスト編集を選択</p>
              <img src="image/questedit1.png" style={{ width: '50%', height: '60%'}} />
              <p>編集したいクエストを選択します</p>
              <img src="image/questedit.png" style={{ width: '50%', height: '60%'}} />
              <p>クエストの編集後「編集」を選択することで編集完了・編集後は未読状態で表示される</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlequestediDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlequestcmpDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>クエスト完了</MenuItem>
          <Dialog open={questcmpopen} onClose={handlequestcmpDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>クエスト完了</DialogTitle>
            <DialogContent>
              <p>メニューバーからクエスト完了を選択</p>
              <p>完了したいクエストを選択</p>
              <img src="image/questfinish.png" style={{ width: '50%', height: '60%'}} />
              <p>クエスト完了後未読状態で全員に表示される</p>
              <img src="image/questfinish1.png" style={{ width: '50%', height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlequestcmpDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handleacdelDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>アカウント削除</MenuItem>
          <Dialog open={acdelopen} onClose={handleacdelDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>アカウント削除</DialogTitle>
            <DialogContent>
              <p>アカウントを削除できます。得点情報などもすべて消えるため注意が必要です。
              <br />ただし、依頼したクエストは残ります。誰も消すことができなくなりますので、依頼したクエストを消してからアカウントを削除してください。
              <br />＊基本的にアカウントの復旧はできません。</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleacdelDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlequestdelDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>クエスト削除</MenuItem>
          <Dialog open={questdelopen} onClose={handlequestdelDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>クエスト削除</DialogTitle>
            <DialogContent>
              <p>依頼したクエストを削除できます。完了後のクエストを削除しても得点の情報は残ります。</p>
              <p>メニューバーからクエストの消去を選択、消去したいクエストの名前を選択する。「削除」ボタンの選択により削除が完了する</p>
              <img src="image/questdel.png" style={{ width: '50%', height: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlequestdelDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlerecDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>実績</MenuItem>
          <Dialog open={recopen} onClose={handlerecDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>実績</DialogTitle>
            <DialogContent>
              <p>ハンター自身のこれまでの実績を確認することができます</p>
              <p>メニューバーの「実績」から確認することができる</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlerecDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlerecallDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>みんなの実績</MenuItem>
          <Dialog open={recallopen} onClose={handlerecallDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>みんなの実績</DialogTitle>
            <DialogContent>
              <p>ハンター全員の完了したクエストを確認することができる</p>
              <p>メニューバーから「みんなのランキング」を選択</p>
              <p>実績を閲覧したいハンターの名前を選択することで表示される</p>
              <img src="image/recall.png" style={{ width: '50%',heigth: '60%'}} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlerecallDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlerankDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>ランキング</MenuItem>
          <Dialog open={rankopen} onClose={handlerankDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>ランキング</DialogTitle>
            <DialogContent>
              <p>メニューバーの「ランキング」から確認することができます</p>
              <p>全ハンターの実績に基づいた得点情報から作成されたランキングを閲覧することができます</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlerankDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />
          <MenuItem
          onClick={handlePrivacyPolicyDialogOpen}
          style={{ fontFamily: 'NotoSansCJK-Black',fontSize: '1.8vh',padding: '1.0vh'}}>プライバシーポリシー</MenuItem>
          <Dialog open={privacyPolicyOpen} onClose={handlePrivacyPolicyDialogClose} align="center">
            <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black'}}>プライバシーポリシー</DialogTitle>
            <DialogContent align="left">
              <p>TnkQuest(以下、「本アプリ」といいます。)は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
              <p><br/>(個人情報)</p>
              <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により個人を識別できる情報及び容貌、指紋、声紋、にかかるデータ、および健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報(個人識別情報)を指します。</p>
              <p><br/>(個人情報の収集方法)</p>
              <p>当アプリは、ユーザーが利用登録する際などに、メールアドレスやLINEアカウントなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録などに関する情報を、当アプリの提携先などから収集することがあります。</p>
              <p><br/>(個人情報を収集・利用する目的)</p>
              <p>1. 当サービスの提供・運営のため</p>
              <p>2. 新クエストの登場や、コメントに関する通知を行うため</p>
              <p>3. ユーザーからのお問い合わせに回答するため</p>
              <p>4. サービスに関するお知らせ・案内を送付するため</p>
              <p>5. 不正・不当な目的で本サービスを利用しようとするユーザーを特定し、ご利用をお断りするため</p>
              <p>6. 上記の利用目的に付随する目的</p>
              <p><br/>(利用目的の変更)</p>
              <p>当アプリは、利用目的が変更前と関連を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について、所定の方法によりユーザーに通知し、または本アプリ上に公表するものとします。</p>
              <p><br/>(個人情報の第三者提供)</p>
              <p>当アプリは、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
              <p><br/>(プライバシーポリシーの変更)</p>
              <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある場合を除いて、ユーザーに通知することなく、変更することができるものとします。当アプリが定める場合を除いて、変更後のプライバシーポリシーは、本アプリに掲載したときから効力を生じるものとします。</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlePrivacyPolicyDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black'}}
                fullWidth
              >
              閉じる   
              </Button>
            </DialogActions>
          </Dialog>
        </Menu>

        {/* メニューを開くボタン */}
        <IconButton
          aria-label="menu"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMainMenuOpen}
          style={{
            zIndex: 1000,
            position: 'fixed',
            right: '2vw',
            top: '2vh',
            backgroundColor: 'rgb(255,239,213)',
            borderRadius: '50%',
            padding: '1.5vh'
          }}
        >
          <MenuIcon style={{ fontSize: '2.5vh' }} />
        </IconButton>
        {/* メニュー本体 */}
        <Menu
          id="long-menu"
          anchorEl={mainAnchorEl}
          keepMounted
          open={Boolean(mainAnchorEl)}
          onClose={handleMainMenuClose}
          PaperProps={{
            style: { backgroundColor: 'rgb(255,239,213)' },
          }}
        >
          <Divider />
          <MenuItem onClick={handleAddQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>クエスト依頼</MenuItem>
          <Divider />
          <MenuItem onClick={handleSelectedEditQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh'}}>クエスト編集</MenuItem>
          <Divider />
          <MenuItem onClick={handleCompleteQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>クエスト完了</MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>クエスト削除</MenuItem>
          <Divider />
          <MenuItem onClick={() => hunter === 'ALL' ? handleHunterDeleteManagementDialogOpen() : handleDeleteHunterDialogOpen()} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>アカウント削除</MenuItem>
          <Divider />
          <MenuItem onClick={handleIndividualAchievementDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>実績</MenuItem>
          <Divider />
          <MenuItem onClick={handleAllHuntersDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>みんなの実績</MenuItem>
          <Divider />
          <MenuItem onClick={handleRankingDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '1.8vh', padding: '1.0vh' }}>ランキング</MenuItem>
          <Divider />
        </Menu>

        <IconButton
          onClick={handleReload}
          style={{
            zIndex: 1000,
            position: 'fixed',
            left: '2vw',
            top: '2vh',
            backgroundColor: 'rgb(255,239,213)',
            borderRadius: '50%',
            padding: '1.5vh'
          }}
        >
          <RefreshIcon style={{ fontSize: '2.5vh' }} />
        </IconButton>

        <Typography
          variant="body1"
          style={{
            fontFamily: 'NotoSansCJK-Black',
            fontSize: '1.8vh',
            position: 'fixed',
            left: '2vw',
            top: '12vh'
            }}
          >
          {hunter}としてログイン中
        </Typography>
        
        {/* クエスト・アカウント管理系のリクエスト */}
        <Dialog open={isAddQuestDialogOpen} onClose={handleCloseAddQuestDialog}>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }} >新しいクエストを追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              style={{ fontSize: '1.8vh' }} 
              label="タイトル"
              type="text"
              fullWidth
              inputProps={{ maxLength: 15 }}
              value={newQuest.title}
              onChange={(e) => handleNewQuestChange('title', e.target.value)}
              helperText="タイトルは15文字以内で入力してください"
              FormHelperTextProps={{
                style: { color: 'red' }
              }}
            />
            <TextField
              margin="dense"
              label="締切"
              style={{ fontSize: '1.8vh' }} 
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newQuest.deadline}
              onChange={(e) => handleNewQuestChange('deadline', e.target.value)}
            />
            <TextField
              margin="dense"
              label="定員"
              style={{ fontSize: '1.8vh' }} 
              type="number"
              fullWidth
              value={newQuest.capacity}
              onChange={(e) => handleNewQuestChange('capacity', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '1.8vh' }} >ランク</InputLabel>
              <Select
                value={newQuest.rank}
                onChange={(e) => handleNewQuestChange('rank', e.target.value)}
                style={{ fontSize: '1.8vh' }} 
                label="ランク"
              >
                <MenuItem value="緊急" style={{ fontSize: '1.8vh' }}>緊急クエスト</MenuItem>
                <MenuItem value="Sランク" style={{ fontSize: '1.8vh' }}>S</MenuItem>
                <MenuItem value="Aランク" style={{ fontSize: '1.8vh' }}>A</MenuItem>
                <MenuItem value="Bランク" style={{ fontSize: '1.8vh' }}>B</MenuItem>
                <MenuItem value="Cランク" style={{ fontSize: '1.8vh' }}>C</MenuItem>
                <MenuItem value="Dランク" style={{ fontSize: '1.8vh' }}>D</MenuItem>
                <MenuItem value="Eランク" style={{ fontSize: '1.8vh' }}>E</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="概要"
              style={{ fontSize: '1.8vh' }}
              type="text"
              multiline
              fullWidth
              value={newQuest.overview}
              onChange={(e) => handleNewQuestChange('overview', e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseAddQuestDialog}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmitNewQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              追加
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteQuestDialogOpen} onClose={handleDeleteQuestDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }} >クエストの削除</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '1.8vh' }} >クエスト選択</InputLabel>
              <Select
                value={selectedDeleteQuest}
                label="削除するクエストの選択"
                onChange={handleDeleteQuestChange}
                style={{
                  fontSize: '1.8vh',
                  }}
                >
                {quests.filter(quest => (hunter === 'ALL' || quest.client === hunter)).map(quest => (
                  <MenuItem key={quest.id} value={quest.id} style={{ fontSize: '1.8vh' }} >
                    {quest.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteQuestDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleDeleteQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteHunterDialogOpen} onClose={handleDeleteHunterDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }} >ハンターの削除</DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              align="center"
              style={{
                fontFamily: 'NotoSansCJK-Black',
                fontSize: '1.8vh',
                }}
            >
              本当にこのアカウントを削除してもよろしいですか。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteHunterDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              いいえ
            </Button>
            <Button
              onClick={() => handleDeleteHunter(hunter)}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={selectedEditQuestDialogOpen} onClose={handleSelectedEditQuestDialogClose} fullWidth>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black'}}>
            クエストの編集
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin='dense'>
              <InputLabel style={{ fontSize: '1.8vh'}}>クエスト選択</InputLabel>
              <Select
                value={selectedEditQuest}
                label="編集するクエストの選択"
                onChange={handleSelectedEditQuestChange}
                style={{ fontSize: '1.8vh' }}
              >
                {quests.filter(quest => (hunter === 'ALL' || quest.client === hunter) && !quest.completed).map(quest => (
                  <MenuItem key={quest.id} value={quest.id} style={{ fontSize: '1.8vh'}}>
                    {quest.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleSelectedEditQuestDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleEditQuestDialogOpen}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              編集   
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editQuestDialogOpen} onClose={handleEditQuestDialogClose}>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black'}}>
            クエストの詳細編集
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              style={{ fontSize: '1.8vh' }} 
              label="タイトル"
              type="text"
              fullWidth
              inputProps={{ maxLength: 15 }}
              value={editableQuestData.title}
              onChange={(e) => setEditableQuestData({ ...editableQuestData, title: e.target.value })}
              helperText="タイトルは15文字以内で入力してください"
              FormHelperTextProps={{
                style: { color: 'red' }
              }}
            />
            <TextField
              margin="dense"
              label="締切"
              style={{ fontSize: '1.8vh' }} 
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editableQuestData.deadline}
              onChange={(e) => setEditableQuestData({ ...editableQuestData, deadline: e.target.value })}
            />
            <TextField
              margin="dense"
              label="定員"
              style={{ fontSize: '1.8vh' }} 
              type="number"
              fullWidth
              value={editableQuestData.capacity}
              onChange={(e) => setEditableQuestData({ ...editableQuestData, capacity: e.target.value })}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '1.8vh' }} >ランク</InputLabel>
              <Select
                value={editableQuestData.rank}
                onChange={(e) => setEditableQuestData({ ...editableQuestData, rank: e.target.value })}
                style={{ fontSize: '1.8vh' }} 
                label="ランク"
              >
                <MenuItem value="緊急" style={{ fontSize: '1.8vh' }}>緊急クエスト</MenuItem>
                <MenuItem value="Sランク" style={{ fontSize: '1.8vh' }}>S</MenuItem>
                <MenuItem value="Aランク" style={{ fontSize: '1.8vh' }}>A</MenuItem>
                <MenuItem value="Bランク" style={{ fontSize: '1.8vh' }}>B</MenuItem>
                <MenuItem value="Cランク" style={{ fontSize: '1.8vh' }}>C</MenuItem>
                <MenuItem value="Dランク" style={{ fontSize: '1.8vh' }}>D</MenuItem>
                <MenuItem value="Eランク" style={{ fontSize: '1.8vh' }}>E</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="概要"
              style={{ fontSize: '1.8vh' }}
              type="text"
              multiline
              fullWidth
              value={editableQuestData.overview}
              onChange={(e) => setEditableQuestData({ ...editableQuestData, overview: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
          <Button
              onClick={handleEditQuestDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleEditQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              編集
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={completeQuestDialogOpen} onClose={handleCompleteQuestDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>
            クエストの完了
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '1.8vh' }}>クエスト選択</InputLabel>
              <Select
                value={selectedCompleteQuest}
                label="完了するクエストの選択"
                onChange={handleCompleteQuestChange}
                style={{ fontSize: '1.8vh' }}
              >
                {quests.filter(quest => (hunter === 'ALL' || quest.client === hunter) && !quest.completed).map(quest => (
                  <MenuItem key={quest.id} value={quest.id} style={{ fontSize: '1.8vh' }}>
                    {quest.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCompleteQuestDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleCompleteQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              完了
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={threadsDialogOpen} onClose={handleThreadDialogClose} fullWidth>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black'}}>
            スレッドの追加・選択
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin='dense'>
              <InputLabel style={{ fontSize: '1.8vh'}}>スレッド追加・選択</InputLabel>
              <Select
                value={selectedThreadId}
                label="スレッドの選択・追加"
                onChange={(e) => handleThreadSelectChange(e.target.value)}
                style={{ fontSize: '1.8vh' }}
              >
                <MenuItem
                  onClick={handleAddThreadDialogOpen}
                  style={{fontSize:'1.8vh',fontFamily:'NotoSansCJK-Black',color:'#1976d2'}}>
                    スレッドの追加
                </MenuItem>

                {threads.map(thread => (
                  <MenuItem key={thread.id} value={thread.id} style={{ fontSize: '1.8vh' }}>
                      {threadStatus[thread.id] ? (
                        thread.title
                      ) : (
                        <span>
                          <span>{`${thread.title} `}</span>
                          <span style={{ color: 'red' }}>(未読)</span>
                        </span>
                      )}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleThreadDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleCommentsDialogOpen}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              選択  
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={addThreadDialogOpen} onClose={handleAddThreadDialogClose}>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }} >新しいスレッドを追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              style={{ fontSize: '1.8vh' }} 
              label="タイトル"
              type="text"
              fullWidth
              inputProps={{ maxLength: 15 }}
              value={newThreadTitle}
              onChange={(e) => handleNewThreadChange(e.target.value)}
              helperText="タイトルは15文字以内で入力してください"
              FormHelperTextProps={{
                style: { color: 'red' }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAddThreadDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmitNewThreads}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              追加
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={commentsDialogOpen} onClose={handleCommentsDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }} >{selectedThread.title}</DialogTitle>
          <DialogContent>
            <Grid container alignItems="center">

              {/* コメント表示エリア */}
              <Grid container direction="column">
              {comments.map((comment, index) => (
                <Grid
                  key={index}
                  container
                  direction="column"
                  alignItems={comment.hunterName === hunter ? 'flex-end' : 'flex-start'}
                  style={{ padding: '20px' }}
                >
                  <Typography
                    variant="caption"
                    style={{
                      marginBottom: '4px',
                      fontFamily: 'NotoSansCJK-Black',
                      fontSize: '1.8vh', // ハンター名のフォントサイズを調整
                    }}
                  >
                    {comment.hunterName}
                  </Typography>
                  <Paper
                    style={{
                      backgroundColor: comment.hunterName === hunter ? '#DCF8C6' : '#ECECEC',
                      padding: '10px',
                      borderRadius: '10px',
                      maxWidth: '60%',
                      whiteSpace: 'pre-wrap', // ここで改行を保持するスタイルを適用
                    }}
                  >
                    <Typography
                      variant="body2"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '2.0vh' }}
                    >
                      {comment.content}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', padding: '1.0vh' }}> {/* 外側のコンテナにパディングを追加 */}
              {/* コメント入力フィールド */}
              <TextField
                margin="dense"
                label="コメント"
                style={{ fontSize: '1.8vh', backgroundColor: 'rgba(240, 240, 240, 0.5)', width: '95%' }}
                type="text"
                multiline
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCommentsDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              閉じる
            </Button>
            <Button
              onClick={handleSubmitNewComments}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={rankingDialogOpen} onClose={handleRankingDialogClose} fullWidth maxWidth="md">
          <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>ランキング</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>順位</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>ハンター名</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>得点</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>緊急</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>S</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>A</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>B</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>C</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>D</TableCell>
                    <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>E</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createRanking(rankCounts).map((item, index) => (
                    <TableRow key={item.hunterName}>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{index + 1}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.hunterName}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.score}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.緊急 || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Sランク || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Aランク || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Bランク || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Cランク || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Dランク || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.Eランク || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleRankingDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* クエスト・アカウント管理系のレスポンス */}
        <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }} >エラー</DialogTitle>
            <DialogContent>
            <DialogContentText style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                接続エラーが発生しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleErrorDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={addQuestSuccessDialogOpen} onClose={handleAddQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に入力された内容でクエストを依頼できました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleAddQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={reenterDialogOpen} onClose={() => setReenterDialogOpen(false)}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>概要文の文字数制限</DialogTitle>
          <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
              一度に送信できる概要文の字数は1000字以下です。
            </DialogContentText>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
              それ以上の文章を追加したい場合は、一度クエストを依頼した後、 クエスト編集から文章を追加してください。
            </DialogContentText>
          </DialogContent>  
          <DialogActions>
            <Button
              onClick={() => setReenterDialogOpen(false)}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteQuestSuccessDialogOpen} onClose={handleDeleteQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト削除</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleDeleteQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={deleteHunterSuccessDialogOpen} onClose={handleDeleteHunterSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたハンターを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleDeleteHunterSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={accpetQuestSuccessDialogOpen} onClose={handleAcceptQuestDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを受諾しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleAcceptQuestDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={questAcceptorDiscardSuccessDialogOpen} onClose={handleQuestAcceptorDiscardDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストのメンバーから外れました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleQuestAcceptorDiscardDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={completeQuestSuccessDialogOpen} onClose={handleCompleteQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを完了しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleCompleteQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={isDuplicateDialogOpen} onClose={() => setIsDuplicateDialogOpen(false)}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>エラー</DialogTitle>
          <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
              このクエストは既に受諾しています。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDuplicateDialogOpen(false)}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>

        {/* 実績ダイアログ */}
        <Dialog open={isAchievementDialogOpen} onClose={handleIndividualAchievementDialogClose} fullWidth maxWidth="md">
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>
            {hunter}の実績
          </DialogTitle>
          <DialogContent style={{ height: '80vh', overflowY: 'auto' }}>
            {achievements.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>ランク</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {achievements.map((achievement, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_title}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_rank}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                実績がありません。
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleIndividualAchievementDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isAllHuntersDialogOpen} onClose={handleAllHuntersDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>実績を表示するユーザーの選択</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="hunter-select-label">実績を表示するユーザーの選択</InputLabel>
              <Select
                labelId="hunter-select-label"
                id="hunter-select"
                value={selectedHunter}
                label="実績を表示するユーザーの選択"
                onChange={handleHunterSelectChange}
              >
                {allHunters.map(hunter => (
                  <MenuItem key={hunter} value={hunter}>{hunter}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAllHuntersDialogClose}
              color="primary"
              variant="contained"
              fullWidth
            >
              閉じる
            </Button>
            <Button
              onClick={() => handleHunterClick(selectedHunter)}
              color="primary"
              variant="contained"
              fullWidth
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isIndividualHunterAchievementDialogOpen} onClose={handleIndividualHunterAchievementDialogClose} fullWidth maxWidth="md">
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>
            {selectedHunter}の実績
          </DialogTitle>
          <DialogContent style={{ height: '80vh', overflowY: 'auto' }}>
            {achievements.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {selectedHunter === 'ALL' && (
                        <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>ハンター名</TableCell>
                      )}
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト</TableCell>
                      <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>ランク</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {achievements.map((achievement, index) => (
                      <TableRow key={index}>
                        {selectedHunter === 'ALL' && (
                          <TableCell align="center" component="th" scope="row" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                            {achievement.hunter_name}
                          </TableCell>
                        )}
                        <TableCell align="center" component="th" scope="row" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_title}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_rank}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
                実績がありません。
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleIndividualHunterAchievementDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>

        {/* ALL用 */}
        <Dialog open={acceptQuestManagementDialogOpen} onClose={handleAcceptQuestManagementDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト受諾者管理</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="hunter-select-label">クエストを受諾するユーザーの選択</InputLabel>
              <Select
                labelId="hunter-select-label"
                id="hunter-select"
                value={selectedHunter}
                label="クエストを受諾するユーザーの選択"
                onChange={handleHunterSelectChange}
              >
                {allHunters.map(hunter => (
                  <MenuItem key={hunter} value={hunter}>{hunter}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAcceptQuestManagementDialogClose}
              color="primary"
              variant="contained"
              fullWidth
            >
              閉じる
            </Button>
            <Button
              onClick={() => handleAcceptQuest(selectedHunter)}
              color="primary"
              variant="contained"
              fullWidth
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={questAcceptorDiscardManagementDialogOpen} onClose={handleQuestAcceptorDiscardManagementDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト辞退管理</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="hunter-select-label">クエストを辞退するユーザーの選択</InputLabel>
              <Select
                labelId="hunter-select-label"
                id="hunter-select"
                value={selectedHunter}
                label="クエストを辞退するユーザーの選択"
                onChange={handleHunterSelectChange}
              >
                {allHunters.map(hunter => (
                  <MenuItem key={hunter} value={hunter}>{hunter}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleQuestAcceptorDiscardManagementDialogClose}
              color="primary"
              variant="contained"
              fullWidth
            >
              閉じる
            </Button>
            <Button
              onClick={() => handleQuestAcceptorDiscard(selectedHunter)}
              color="primary"
              variant="contained"
              fullWidth
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={hunterDeleteManagementDialogOpen} onClose={handleHunterDeleteManagementDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>アカウント削除管理</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="hunter-select-label">ユーザーの選択</InputLabel>
              <Select
                labelId="hunter-select-label"
                id="hunter-select"
                value={selectedHunter}
                label="ユーザーの選択"
                onChange={handleHunterSelectChange}
              >
                {allHunters.map(hunter => (
                  <MenuItem key={hunter} value={hunter}>{hunter}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleHunterDeleteManagementDialogClose}
              color="primary"
              variant="contained"
              fullWidth
            >
              閉じる
            </Button>
            <Button
              onClick={() => handleDeleteHunter(selectedHunter)}
              color="primary"
              variant="contained"
              fullWidth
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteQuestSuccessDialogOpen} onClose={handleDeleteQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>クエスト削除</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleDeleteQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={hunterDeleteManagementSuccessDialogOpen} onClose={handleHunterDeleteManagementSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '2.2vh', margin: '1.2vh', fontFamily: 'NotoSansCJK-Black' }}>ハンター削除</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたハンターを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleHunterDeleteManagementSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
      </Grid>
  );
};

export default QuestSelection;
