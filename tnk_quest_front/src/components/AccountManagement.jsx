import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function AccountManagement({ onLogin, onSubmit }) {
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isPasswordResetOpen, setPasswordResetOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [resetPasswordMismatchError, setResetPasswordMismatchError] = useState(false);
  const [signupErrorDialogOpen, setSignupErrorDialogOpen] = useState(false);
  const [loginErrorDialogOpen, setLoginErrorDialogOpen] = useState(false);
  const [resetErrorDialogOpen, setResetErrorDialogOpen] = useState(false);

  const handleCreateAccountOpen = () => {
    setCreateAccountOpen(true);
  };

  const handleCreateAccountClose = () => {
    setCreateAccountOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handlePasswordResetOpen = () => {
    setPasswordResetOpen(true);
  };

  const handlePasswordResetClose = () => {
    setPasswordResetOpen(false);
  };

  const handleLoginSuccess = () => {
    onLogin();
  };

  const handleSignupErrorDialogClose = () => {
    setSignupErrorDialogOpen(false);
  };

  const handleLoginErrorDialogClose = () => {
    setLoginErrorDialogOpen(false);
  };

  const handleResetErrorDialogClose = () => {
    setResetErrorDialogOpen(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMismatchError(event.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMismatchError(password !== event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleResetPasswordChange = (event) => {
    setResetPassword(event.target.value);
    setResetPasswordMismatchError(event.target.value !== resetConfirmPassword);
  };

  const handleResetConfirmPasswordChange = (event) => {
    setResetConfirmPassword(event.target.value);
    setResetPasswordMismatchError(resetPassword !== event.target.value);
  };

  const handleCreateAccountSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        handleCreateAccountClose();
        handleLoginSuccess();
        onSubmit(data.user);
      } else {
        setSignupErrorDialogOpen(true);
      }
    } catch (error) {
      setSignupErrorDialogOpen(true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        handleLoginSuccess();
        onSubmit(data.user);
      } else {
        setLoginErrorDialogOpen(true);
      }
    } catch (error) {
      setLoginErrorDialogOpen(true);
    }
  };

  const handlePasswordResetSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: resetPassword }),
      });

      if (response.status === 200) {
        handlePasswordResetClose();
        // パスワードリセット成功のメッセージなどを表示するためのロジックをここに追加できます。
      } else {
        setResetErrorDialogOpen(true);
      }
    } catch (error) {
      setResetErrorDialogOpen(true);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleCreateAccountOpen}
            style={{
              backgroundImage: 'url(/image/logo_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '1vh 0',
              padding: '1vh 3vw',
              fontFamily: 'NotoSansCJK-Black',
              fontSize: '2.5vh',
              width: '50vw',
              color: 'rgb(255,239,213)'
            }}
          >
            アカウント作成
          </Button>
          <Button
            variant="contained"
            onClick={handleLoginOpen}
            style={{
              backgroundImage: 'url(/image/logo_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '1vh 0',
              padding: '1vh 3vw',
              fontFamily: 'NotoSansCJK-Black',
              fontSize: '2.5vh',
              width: '50vw',
              color: 'rgb(255,239,213)'
            }}
          >
            ログイン
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordResetOpen}
            style={{
              backgroundImage: 'url(/image/logo_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '1vh 0',
              padding: '1vh 3vw',
              fontFamily: 'NotoSansCJK-Black',
              fontSize: '2.5vh',
              width: '50vw',
              color: 'rgb(255,239,213)'
            }}
          >
            パスワードリセット
          </Button>
          <img src="/image/entry.png" alt="エントリー" style={{ maxWidth: '70%', height: 'auto', margin: '1.5vh' }} />
        </div>
      </div>

      {/* アカウント作成ダイアログ */}
      <Dialog open={isCreateAccountOpen} onClose={handleCreateAccountClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>アカウント作成</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            新しいアカウントを作成してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            style={{ fontSize: '1.8vh' }}
            label="ハンター名"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            style={{ fontSize: '1.8vh' }}
            label="パスワード"
            type="password"
            required
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            style={{ fontSize: '1.8vh' }}
            label="パスワード確認"
            type="password"
            required
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={passwordMismatchError}
            helperText={passwordMismatchError ? "パスワードが一致しません" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreateAccountClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            キャンセル
          </Button>
          <Button
            onClick={handleCreateAccountSubmit}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
            disabled={passwordMismatchError || !password || !confirmPassword}
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>

      {/* ログインダイアログ */}
      <Dialog open={isLoginOpen} onClose={handleLoginClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>ログイン</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            アカウント情報を入力してログインしてください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            style={{ fontSize: '1.8vh' }}
            label="ハンター名"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            style={{ fontSize: '1.8vh' }}
            label="パスワード"
            type="password"
            required
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLoginClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            キャンセル
          </Button>
          <Button
            onClick={handleLogin}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            ログイン
          </Button>
        </DialogActions>
      </Dialog>

      {/* パスワードリセットダイアログ */}
      <Dialog open={isPasswordResetOpen} onClose={handlePasswordResetClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', margin: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>パスワードリセット</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            新しいパスワードを入力してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resetUsername"
            style={{ fontSize: '1.8vh' }}
            label="ハンター名"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="resetPassword"
            style={{ fontSize: '1.8vh' }}
            label="新しいパスワード"
            type="password"
            required
            fullWidth
            value={resetPassword}
            onChange={handleResetPasswordChange}
          />
          <TextField
            margin="dense"
            id="resetConfirmPassword"
            style={{ fontSize: '1.8vh' }}
            label="パスワード確認"
            type="password"
            required
            fullWidth
            value={resetConfirmPassword}
            onChange={handleResetConfirmPasswordChange}
            error={resetPasswordMismatchError}
            helperText={resetPasswordMismatchError ? "パスワードが一致しません" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePasswordResetClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            キャンセル
          </Button>
          <Button
            onClick={handlePasswordResetSubmit}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
            disabled={resetPasswordMismatchError || !resetPassword || !resetConfirmPassword}
          >
            送信
          </Button>
        </DialogActions>
      </Dialog>

      {/* エラーダイアログ */}
      <Dialog open={signupErrorDialogOpen} onClose={handleSignupErrorDialogClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>エラー</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            入力されたユーザー名は既に使われています。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSignupErrorDialogClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            理解した
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loginErrorDialogOpen} onClose={handleLoginClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>エラー</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            入力された情報ではログインできません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLoginErrorDialogClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            理解した
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetErrorDialogOpen} onClose={handleResetErrorDialogClose}>
        <DialogTitle align="center" style={{ fontSize: '2.2vh', marginBottom: '1.5vh', fontFamily: 'NotoSansCJK-Black' }}>エラー</DialogTitle>
        <DialogContent>
          <DialogContentText align="center" style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}>
            パスワードリセットのリクエストに失敗しました。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleResetErrorDialogClose}
            color="primary"
            variant="contained"
            style={{ fontSize: '1.8vh', fontFamily: 'NotoSansCJK-Black' }}
            fullWidth
          >
            理解した
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccountManagement;
