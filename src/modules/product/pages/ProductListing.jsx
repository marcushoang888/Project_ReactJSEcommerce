import { useQuery } from "@tanstack/react-query";
import supabase from "../../../config/supabase";
import {
  Box,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import CustomToolbar from "../components/ProductListingToolbar";
import Loading from "../../common/components/Loading";
import DeleteAction from "../components/DeleteAction";
export default function ProductListing() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      supabase
        .from("product")
        .select(
          `id, title, price, thumbnail, stock, rating, category (name), brand (name)`
        ),
    select: (res) => {
      return res.data.map((item) => ({
        ...item,
        category: item.category.name,
        brand: item.brand.name,
      }));
    },
  });

  if (isLoading)
    return <Loading/>

  const gridData = {
    columns: [
      {
        field: "id",
        headerName: "Id",
      },
      {
        field: "title",
        headerName: "Title",
        width: 280,
        renderCell: (params) => {
          const thumbnail = params.row.thumbnail;
          const title = params.value;
          return (
            <Stack direction="row" alignItems="center" gap={2}>
              <Box width={70} height={50}>
                <CardMedia
                  component="img"
                  height={50}
                  width={50}
                  image={thumbnail}
                  alt={title}
                  sx={{
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box>{title}</Box>
            </Stack>
          );
        },
      },
      {
        field: "stock",
        headerName: "Stock",
      },
      {
        field: "price",
        headerName: "Price ($)",
      },
      {
        field: "category",
        headerName: "Category",
        renderCell: (params) => {
          const categoryColors = {
            laptops: "primary",
            smartphones: "success",
            pc: "secondary",
            tablet: "error",
          };
          return (
            <Chip
              label={params.value}
              variant="outlined"
              color={categoryColors[params.value]}
              size="small"
            />
          );
        },
      },
      {
        field: "brand",
        headerName: "Brand",
        renderCell: (params) => {
          const categoryColors = {
            apple: "primary",
            samsung: "success",
            lg: "secondary",
            nokia: "error",
          };
          return (
            <Chip
              label={params.value}
              color={categoryColors[params.value]}
              size="small"
            />
          );
        },
      },

      {
        field: "rating",
        headerName: "Rating",
        renderCell: (params) => {
          return (
            <Rating
              name="half-rating-read"
              defaultValue={params.value}
              precision={0.5}
              readOnly
            />
          );
        },
        width: 150,
      },

      {
        field: "action",
        headerName: "Action",
        renderCell: (params) => {
          return (
            <Stack direction="row" alignItems="center">
              <Tooltip title="View Detail" placement="top">
                <IconButton aria-label="View Detail" to={`/products/${params.id}`}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit" placement="top">
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton >
              </Tooltip>


              <DeleteAction  id={params.id}/>
          
            </Stack>
          );
        },
        width: 150,
      },
    ],
    rows: products,
  };
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        {...gridData}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
