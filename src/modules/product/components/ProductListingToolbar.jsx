import { Button } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ marginLeft: "auto" }}
        to="/products/new"
      >
        New Product
      </Button>
    </GridToolbarContainer>
  );
}
