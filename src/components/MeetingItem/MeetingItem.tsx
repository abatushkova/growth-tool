import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)<PaperProps>(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
// const Item = styled((props: PaperProps) => (
//   <MuiPaper {...props} />
// ))(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
// }));
const CustomAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));
// const CustomAccordion = styled((props: AccordionProps) => (
//   <MuiAccordion {...props} />
// ))(({ theme }) => ({
//   backgroundColor: theme.palette.secondary.light,
// }));

interface ITopic {
  name: string;
}
interface IMeetingProps {
  id: number;
  title: string;
  created: string;
  topics: ITopic[];
}

export default function MeetingItem({ id, title, created, topics }: IMeetingProps) {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (id: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? id : false);
    };

  return (
    <CustomAccordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} container flexWrap="nowrap" spacing={2}>
            <Grid item>
              <Chip label={topics.length} size="small" />
            </Grid>
            <Grid item>
              <Typography variant="h6" component="p" color="text.main">{title}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {created}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0.5}>
          {topics.map((topic, index) => (
            <Item key={index}>{topic.name}</Item>
          ))}
        </Stack>
        <Button variant="text" sx={{ mt: 2 }}>+ New Topic</Button>
      </AccordionDetails>
    </CustomAccordion>
  );
}
