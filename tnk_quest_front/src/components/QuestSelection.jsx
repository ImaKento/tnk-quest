import React, { useState, useEffect, useRef } from 'react';
import { Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Menu, IconButton, DialogContentText, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

function QuestSelection({ hunter, deleteHunter }) {
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [questAcceptorAnchorEl, setQuestAcceptorAnchorEl] = useState(null);
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [rankCounts, setRankCounts] = useState({});
  const buttonRef = useRef(null);
  const [isAddQuestDialogOpen, setIsAddQuestDialogOpen] = useState(false);
  const [completeQuestDialogOpen, setCompleteQuestDialogOpen] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const [selectedDeleteQuest, setSelectedDeleteQuest] = useState('');
  const [selectedCompleteQuest, setSelectedCompleteQuest] = useState('');
  const [deleteQuestDialogOpen, setDeleteQuestDialogOpen] = useState(false);
  const [deleteHunterDialogOpen, setDeleteHunterDialogOpen] = useState(false);
  const [addQuestSuccessDialogOpen, setAddQuestSuccessDialogOpen] = useState(false);
  const [deleteQuestSuccessDialogOpen, setDeleteQuestSuccessDialogOpen] = useState(false);
  const [deleteHunterSuccessDialogOpen, setDeleteHunterSuccessDialogOpen] = useState(false);
  const [accpetQuestSuccessDialogOpen, setAccpetQuestSuccessDialogOpen] = useState(false);
  const [questAcceptorDiscardSuccessDialogOpen, setQuestAcceptorDiscardSuccessDialogOpen] = useState(false);
  const [completeQuestSuccessDialogOpen, setCompleteQuestSuccessDialogOpen] = useState(false);
  const [acceptQuestManagementDialogOpen, setAcceptQuestManagementDialogOpen] = useState(false);
  const [questAcceptorDiscardManagementDialogOpen, setQuestAcceptorDiscardManagementDialogOpen] = useState(false);
  const [rankingDialogOpen, setRankingDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [allHunters, setAllHunters] = useState([]);
  const [selectedHunter, setSelectedHunter] = useState(null);
  const [isAllHuntersDialogOpen, setIsAllHuntersDialogOpen] = useState(false);
  const [isIndividualHunterAchievementDialogOpen, setIsIndividualHunterAchievementDialogOpen] = useState(false);
  const [newQuest, setNewQuest] = useState({
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
  // ランキングのソート用定義
  const rankPoints = {
    S: 7,
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1
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

  const handleMainMenuOpen = (event) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleQuestAcceptorMenuClick = (event) => {
    setQuestAcceptorAnchorEl(event.currentTarget);
  };

  const handleQuestAcceptorMenuClose = () => {
    setQuestAcceptorAnchorEl(null);
  };

  const handleMainMenuClose = () => {
    setMainAnchorEl(null);
  };

  const handleDeleteQuestChange = (event) => {
    setSelectedDeleteQuest(event.target.value);
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

  const handleCompleteQuestDialogOpen = () => {
    setCompleteQuestDialogOpen(true);
  }

  const handleCompleteQuestDialogClose = () => {
    setCompleteQuestDialogOpen(false);
  }

  const handleCompleteQuestSuccessDialogClose = () => {
    setCompleteQuestSuccessDialogOpen(false);
  }

  const handleAcceptQuestDialogClose = () => {
    setAccpetQuestSuccessDialogOpen(false);
  }

  const handleQuestAcceptorDiscardDialogClose = () => {
    setQuestAcceptorDiscardSuccessDialogOpen(false);
  }

  const handleAddQuestDialogOpen = () => {
    setNewQuest({ ...newQuest, client: hunter });
    setIsAddQuestDialogOpen(true);
  };

  const handleCloseAddQuestDialog = () => {
    setIsAddQuestDialogOpen(false);
  };

  const handleNewQuestChange = (field, value) => {
    setNewQuest({ ...newQuest, [field]: value });
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

  const handleRankingDialogClose = () => {
    setRankingDialogOpen(false);
  }

// 全ユーザーのユーザーネームを取得する関数
const fetchAllHunters = async () => {
  try {
    const response = await fetch('http://192.168.11.52:3000/getHunters/');
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
  const response = await fetch(`http://192.168.11.52:3000/getAchievements/${hunterName}`);
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
      const response = await fetch(`http://192.168.11.52:3000/deleteQuest/${selectedDeleteQuest}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteQuestSuccessDialogOpen(true);
        // クエストリストを更新するために再取得する
        fetchQuests();
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }

    handleDeleteQuestDialogClose();
  };

  // ハンターの削除を処理する関数
  const handleDeleteHunter = async () => {
    try {
      const response = await fetch(`http://192.168.11.52:3000/deleteHunter/${hunter}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteHunterSuccessDialogOpen(true);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }

    handleDeleteHunterDialogClose();
  };

  // クエストを完了する関数
  const handleCompleteQuest = async () => {
    try {
      const response = await fetch('http://192.168.11.52:3000/completeQuest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quest_id: selectedQuest.id }),
      });

      if (response.ok) {
        setCompleteQuestSuccessDialogOpen(true);
        handleCompleteQuestDialogClose();
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  // ログイン中のハンターの実績を取得する関数
  const handleIndividualAchievementDialogOpen = async () => {
    setIsAchievementDialogOpen(true);

    // 実績データを取得
    const response = await fetch(`http://192.168.11.52:3000/getAchievements/${hunter}`);
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
  const handleQuestSelect = (quest) => {
    setSelectedQuest(quest);
    updateBackgroundImageIndex(); // 背景画像のインデックスを更新
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
      const response = await fetch('http://192.168.11.52:3000/addQuest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuest),
      });
  
      if (response.status === 200) {
        // リクエストが成功した場合
        console.log(newQuest);
        handleCloseAddQuestDialog();
        setAddQuestSuccessDialogOpen(true);
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
      const response = await fetch('http://192.168.11.52:3000/acceptQuest/', {
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

  // 受諾中のクエストを破棄する関数
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
      const response = await fetch(`http://192.168.11.52:3000/updateQuest/${selectedQuest.id}/`, {
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
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  const fetchAllRanksCount = async () => {
    try {
      const response = await fetch('http://192.168.11.52:3000/getAllRanksCount');
      if (response.ok) {
        const data = await response.json();
        setRankCounts(data);
      } else {
        setErrorDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
      setErrorDialogOpen(true);
    }
  };

  // APIからクエストのリストを取得する関数
  const fetchQuests = async () => {
    try {
      const response = await fetch('http://192.168.11.52:3000/getQuest/');
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
    fetchQuests();
  }, []);

  // リロードボタンが押されたときにデータを再取得
  const handleReload = () => {
    fetchQuests();
    setSelectedQuest(null)
  };

  return (
      <Grid container spacing={2} style={{ marginTop: '180px' }}>
        <Grid item xs={12} lg={3} style={{ display: 'flex', flexDirection: 'column' }}>
          {quests.map(quest => (
            <Button
              key={quest.id}
              variant="contained"
              onClick={() => handleQuestSelect(quest)}
              style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', margin: '10px', backgroundColor: 'rgba(101, 67, 33, 0.7)' }}
            >
              {quest.title}  {quest.rank}ランク
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
              margin: '20px 0',
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
                    top: 90,
                    right: 20,
                    backgroundImage: 'url(/image/logo_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '15px 30px',
                    fontFamily: 'NotoSansCJK-Black',
                    fontSize: '16px',
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
                      width: buttonRef.current ? buttonRef.current.offsetWidth : 'auto'
                    },
                  }}
                >
                  {selectedQuest.hunters.split(' ').map((acceptor, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleQuestAcceptorMenuClose}
                      style={{
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '16px',
                        padding: '10px',
                      }}
                    >
                      {acceptor}
                    </MenuItem>
                  ))}
                </Menu>

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  {/* タイトル */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      align="center"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '50px', marginBottom: '60px' }}
                    >
                      {selectedQuest.title}
                    </Typography>
                  </Grid>

                  {/* 依頼者 */}
                  <Grid item xs={2}>
                    <Typography
                      variant="body1"
                      align="right"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      依頼者：
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body1"
                      align="left"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      {selectedQuest.client}
                    </Typography>
                  </Grid>

                  {/* 締切 */}
                  <Grid item xs={2}>
                    <Typography
                      variant="body1"
                      align="right"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      締切：
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body1"
                      align="left"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      {formatDateWithTime(selectedQuest.deadline)}
                    </Typography>
                  </Grid>

                  {/* 定員 */}
                  <Grid item xs={2}>
                    <Typography
                      variant="body1"
                      align="right"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      定員：
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body1"
                      align="left"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', marginBottom: '30px' }}
                    >
                      {selectedQuest.capacity}
                    </Typography>
                  </Grid>

                  {/* 概要 */}
                  <Grid item xs={2}>
                    <Typography
                      variant="body1"
                      align="right"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', whiteSpace: 'pre-line', marginBottom: '30px' }}
                    >
                      概要：
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body1"
                      align="left"
                      style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '30px', whiteSpace: 'pre-line', marginBottom: '30px' }}
                    >
                      {selectedQuest.overview}
                    </Typography>
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
                        padding: '15px 30px',
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '40px',
                        marginBottom: '20px',
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
                        padding: '15px 30px',
                        fontFamily: 'NotoSansCJK-Black',
                        fontSize: '40px',
                        marginBottom: '20px',
                        width: '100%',
                        color: 'rgb(255,239,213)',
                      }}
                      fullWidth
                    >
                      {hunter === 'ALL' ? 'クエスト破棄管理' : 'このクエストを破棄する'}
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
              bottom: 20,
              right: 20,
              backgroundColor: 'rgb(255,239,213)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              padding: '30px'
            }}
        >
          <VerticalAlignBottomIcon style={{ fontSize: '50px' }}/>
        </Fab>

        {/* メニューを開くボタン */}
        <IconButton
          aria-label="menu"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMainMenuOpen}
          style={{
            zIndex: 1000,
            position: 'fixed',
            right: '50px',
            top: '50px',
            backgroundColor: 'rgb(255,239,213)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            padding: '30px'
          }}
        >
          <MenuIcon style={{ fontSize: '50px' }} />
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
          <MenuItem onClick={handleAddQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>クエスト依頼</MenuItem>
          <Divider />
          <MenuItem onClick={handleCompleteQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>クエスト完了</MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteQuestDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>クエスト削除</MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteHunterDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>アカウント削除</MenuItem>
          <Divider />
          <MenuItem onClick={handleIndividualAchievementDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>実績</MenuItem>
          <Divider />
          <MenuItem onClick={handleAllHuntersDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>みんなの実績</MenuItem>
          <Divider />
          <MenuItem onClick={handleRankingDialogOpen} style={{ fontFamily: 'NotoSansCJK-Black', fontSize: '20px', padding: '10px' }}>ランキング</MenuItem>
          <Divider />
        </Menu>

        <IconButton
          onClick={handleReload}
          style={{
            zIndex: 1000,
            position: 'fixed',
            left: '50px',
            top: '50px',
            backgroundColor: 'rgb(255,239,213)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            padding: '30px'
          }}
        >
          <RefreshIcon style={{ fontSize: '50px' }} />
        </IconButton>

        <Typography
          variant="body1"
          style={{
            fontFamily: 'NotoSansCJK-Black',
            fontSize: '20px',
            position: 'fixed',
            left: 40,
            top: 160
            }}
          >
          {hunter}としてログイン中
        </Typography>
        
        {/* クエスト・アカウント管理系のリクエスト */}
        <Dialog open={isAddQuestDialogOpen} onClose={handleCloseAddQuestDialog}>
          <DialogTitle align="center" style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }} >新しいクエストを追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              style={{ fontSize: '20px' }} 
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
              style={{ fontSize: '20px' }} 
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newQuest.deadline}
              onChange={(e) => handleNewQuestChange('deadline', e.target.value)}
            />
            <TextField
              margin="dense"
              label="定員"
              style={{ fontSize: '20px' }} 
              type="number"
              fullWidth
              value={newQuest.capacity}
              onChange={(e) => handleNewQuestChange('capacity', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '20px' }} >ランク</InputLabel>
              <Select
                value={newQuest.rank}
                onChange={(e) => handleNewQuestChange('rank', e.target.value)}
                style={{ fontSize: '20px' }} 
                label="ランク"
              >
                <MenuItem value="S" style={{ fontSize: '20px' }}>S</MenuItem>
                <MenuItem value="A" style={{ fontSize: '20px' }}>A</MenuItem>
                <MenuItem value="B" style={{ fontSize: '20px' }}>B</MenuItem>
                <MenuItem value="C" style={{ fontSize: '20px' }}>C</MenuItem>
                <MenuItem value="D" style={{ fontSize: '20px' }}>D</MenuItem>
                <MenuItem value="E" style={{ fontSize: '20px' }}>E</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="概要"
              style={{ fontSize: '20px' }}
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
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmitNewQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              追加
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteQuestDialogOpen} onClose={handleDeleteQuestDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'NotoSansCJK-Black' }} >クエストの削除</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '20px' }} >クエスト選択</InputLabel>
              <Select
                value={selectedDeleteQuest}
                label="削除するクエストの選択"
                onChange={handleDeleteQuestChange}
                style={{
                  fontSize: '20px',
                  }}
                >
                {quests.filter(quest => (hunter === 'ALL' || quest.client === hunter)).map(quest => (
                  <MenuItem key={quest.id} value={quest.id} style={{ fontSize: '20px' }} >
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
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleDeleteQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteHunterDialogOpen} onClose={handleDeleteHunterDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'NotoSansCJK-Black' }} >クエストの削除</DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              align="center"
              style={{
                fontFamily: 'NotoSansCJK-Black',
                fontSize: '20px',
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
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              いいえ
            </Button>
            <Button
              onClick={handleDeleteHunter}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={completeQuestDialogOpen} onClose={handleCompleteQuestDialogClose} fullWidth>
          <DialogTitle align="center" style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'NotoSansCJK-Black' }}>
            クエストの完了
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel style={{ fontSize: '20px' }}>クエスト選択</InputLabel>
              <Select
                value={selectedCompleteQuest}
                label="完了するクエストの選択"
                onChange={handleCompleteQuestChange}
                style={{ fontSize: '20px' }}
              >
                {quests.filter(quest => (hunter === 'ALL' || quest.client === hunter) && !quest.completed).map(quest => (
                  <MenuItem key={quest.id} value={quest.id} style={{ fontSize: '20px' }}>
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
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              キャンセル
            </Button>
            <Button
              onClick={handleCompleteQuest}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}
              fullWidth
            >
              完了
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={rankingDialogOpen} onClose={handleRankingDialogClose} fullWidth maxWidth="md">
          <DialogTitle align="center" style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'NotoSansCJK-Black' }}>ランキング</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>順位</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>ハンター名</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>得点</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>S</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>A</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>B</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>C</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>D</TableCell>
                    <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>E</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createRanking(rankCounts).map((item, index) => (
                    <TableRow key={item.hunterName}>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{index + 1}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.hunterName}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.score}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.S || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.A || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.B || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.C || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.D || 0}</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>{item.ranks.E || 0}</TableCell>
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
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* クエスト・アカウント管理系のレスポンス */}
        <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }} >エラー</DialogTitle>
            <DialogContent>
            <DialogContentText style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                接続エラーが発生しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleErrorDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={addQuestSuccessDialogOpen} onClose={handleAddQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に入力された内容でクエストを依頼できました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleAddQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={deleteQuestSuccessDialogOpen} onClose={handleDeleteQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleDeleteQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={deleteHunterSuccessDialogOpen} onClose={handleDeleteHunterSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたハンターを削除しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleDeleteHunterSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={accpetQuestSuccessDialogOpen} onClose={handleAcceptQuestDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを受諾しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleAcceptQuestDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={questAcceptorDiscardSuccessDialogOpen} onClose={handleQuestAcceptorDiscardDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストのメンバーから外れました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleQuestAcceptorDiscardDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={completeQuestSuccessDialogOpen} onClose={handleCompleteQuestSuccessDialogClose}>
            <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト依頼</DialogTitle>
            <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} >
                正常に指定されたクエストを完了しました。
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={handleCompleteQuestSuccessDialogClose}
                color="primary"
                variant="contained"
                style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
                fullWidth
            >
                理解した
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={isDuplicateDialogOpen} onClose={() => setIsDuplicateDialogOpen(false)}>
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>エラー</DialogTitle>
          <DialogContent>
            <DialogContentText align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
              このクエストは既に受諾しています。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDuplicateDialogOpen(false)}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>

        {/* 実績ダイアログ */}
        <Dialog open={isAchievementDialogOpen} onClose={handleIndividualAchievementDialogClose} fullWidth maxWidth="md">
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>
            {hunter}の実績
          </DialogTitle>
          <DialogContent style={{ height: '400px', overflowY: 'auto' }}>
            {achievements.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="実績テーブル">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>ランク</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {achievements.map((achievement, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_title}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_rank}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                実績がありません。
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleIndividualAchievementDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isAllHuntersDialogOpen} onClose={handleAllHuntersDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>実績を表示するユーザーの選択</DialogTitle>
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
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>
            {selectedHunter}の実績
          </DialogTitle>
          <DialogContent style={{ height: '400px', overflowY: 'auto' }}>
            {achievements.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="実績テーブル">
                  <TableHead>
                    <TableRow>
                      {selectedHunter === 'ALL' && (
                        <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>ハンター名</TableCell>
                      )}
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト</TableCell>
                      <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>ランク</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {achievements.map((achievement, index) => (
                      <TableRow key={index}>
                        {selectedHunter === 'ALL' && (
                          <TableCell align="center" component="th" scope="row" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                            {achievement.hunter_name}
                          </TableCell>
                        )}
                        <TableCell align="center" component="th" scope="row" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_title}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                          {achievement.quest_rank}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" align="center" style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }}>
                実績がありません。
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleIndividualHunterAchievementDialogClose}
              color="primary"
              variant="contained"
              style={{ fontSize: '20px', fontFamily: 'NotoSansCJK-Black' }} 
              fullWidth
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>

        {/* ALL用 */}
        <Dialog open={acceptQuestManagementDialogOpen} onClose={handleAcceptQuestManagementDialogClose}>
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト受諾者管理</DialogTitle>
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
          <DialogTitle align='center' style={{ fontSize: '24px', margin: '20px', fontFamily: 'NotoSansCJK-Black' }}>クエスト破棄管理</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="hunter-select-label">クエストを破棄するユーザーの選択</InputLabel>
              <Select
                labelId="hunter-select-label"
                id="hunter-select"
                value={selectedHunter}
                label="クエストを破棄するユーザーの選択"
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
      </Grid>
  );
}

export default QuestSelection;
