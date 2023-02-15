import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function ProfilePickerModal({ pickerOpen, setPickerOpen, setChosenAvatar }) {
  const handleClose = () => {
    setPickerOpen(false);
  };

  const handleAvatarClick = (e) => {
    setChosenAvatar(e.target.src);
    setPickerOpen(false);
  };

  const itemData = [
    {
      img: 'https://appamatix.com/wp-content/uploads/2016/05/04-450x427.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://1fid.com/wp-content/uploads/2022/07/funny-profile-pic-9.jpg',
      title: 'Burger',
    },
    {
      img: 'https://i.pinimg.com/736x/f6/64/d2/f664d2e17e2e6649ddf66c12a7c7c84c.jpg',
      title: 'Camera',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPS8h-UPnSt4aC84WsbaWBVWabuqR_UDQ3FzuW_kHs6slDy0BFjAhSUGe2_SoXla2cyNY&usqp=CAU',
      title: 'Coffee',
    },
    {
      img: 'https://i.pinimg.com/550x/6b/95/01/6b9501905d858837e8258c474c1f99c5.jpg',
      title: 'Hats',
    },
    {
      img: 'https://ih1.redbubble.net/image.313373293.7868/st,small,845x845-pad,1000x1000,f8f8f8.u2.jpg',
      title: 'Honey',
    },
    {
      img: 'https://www.meme-arsenal.com/memes/03a5b4225f894067d210bc22aa5cfc58.jpg',
      title: 'Basketball',
    },
    {
      img: 'https://i.kym-cdn.com/photos/images/newsfeed/001/105/997/fe3.jpg',
      title: 'Fern',
    },
    {
      img: 'https://stickerly.pstatic.net/sticker_pack/tuhLgeeNbLotJ5dQNtjBYg/KQ7T1T/6/33a474f0-2b49-4b6b-bbbb-1b5d8d3d6fac.png',
      title: 'Mushrooms',
    },
    {
      img: 'https://pics.me.me/thumb_disgusted-face-girl-memes-memes-pics-2019-48788813.png',
      title: 'Tomato basil',
    },
    {
      img: 'https://i.pinimg.com/474x/9a/46/0d/9a460d46bfa9a449ba9379e2f5b9aeba.jpg',
      title: 'Sea star',
    },
    {
      img: 'https://i.pinimg.com/736x/ab/63/7f/ab637fe02f86beefc498e5f777cf17ed.jpg',
      title: 'Bike',
    },
  ];

  return (
    <Dialog open={pickerOpen} onClose={handleClose}>
      <DialogTitle>Profile Avatars</DialogTitle>
      <DialogContent>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} onClick={handleAvatarClick}>
              <img
                src={`${item.img}`}
                srcSet={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfilePickerModal;
