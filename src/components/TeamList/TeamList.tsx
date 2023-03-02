import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const members = [
  {
    id: 1,
    color: 'teal',
    name: 'Alon'
  },
  {
    id: 2,
    color: 'orange',
    name: 'Akhil'
  },
  {
    id: 3,
    color: 'gold',
    name: 'Gianluca'
  },
];

export default function TeamList() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonAddIcon sx={{ fontSize: 20 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>New Member</ListItemText>
        </ListItemButton>
      </ListItem>
      {members.map(({ id, color, name }) => (
        <ListItem disablePadding key={id}>
          <ListItemButton
            selected={selectedIndex === id}
            onClick={(event) => handleListItemClick(event, id)}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ bgcolor: color }}
                alt={name}
                // src=""
              />
            </ListItemAvatar>
            <ListItemText>{name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
