import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { ArchiveErrand, Errand } from '../../store/modules/UserSlice';

type CheckboxProp = {
  errand: Errand;
};

export const ArchiveCheckbox = ({ errand }: CheckboxProp) => {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Box>
        <FormControlLabel
          label="Arquivar"
          control={
            <Checkbox
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              size="small"
              checked={errand.archived}
              onChange={() => dispatch(ArchiveErrand(errand))}
            />
          }
        />
      </Box>
    </Box>
  );
};
