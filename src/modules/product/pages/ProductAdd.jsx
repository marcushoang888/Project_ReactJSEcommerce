import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import NumericFormatCustom from "../components/NumericFormatCustom";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import Loading from "../../common/components/Loading";
import { useForm } from "react-hook-form";
import { convertPrice } from "../helpers/price";
import supabase from "../../../config/supabase";
import RHFSelect from "../components/RHFSelect";

export default function ProductAdd() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category_id: "",
      brand_id: "",
    },
  });
  const [categoryQuery, brandQuery] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => supabase.from("category").select(),
        select: (res) => res.data,
      },
      {
        queryKey: ["brands"],
        queryFn: () => supabase.from("brand").select(),
        select: (res) => res.data,
      },
    ],
  });

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => supabase.from("product").insert(newProduct),
    onSuccess: () => console.log("OK"),
  });

  const isLoading = [categoryQuery, brandQuery].some(
    (query) => query.isLoading
  );

  function handleAddProduct(data) {
    addProductMutation.mutate({
      "title": "2",
      "price": 34,
      "description": "ưad",
      "category_id": 1,
      "brand_id": 3
  });


    console.log({
      ...data,
      price: convertPrice(data.price),
    });
  }

  if (isLoading) return <Loading />;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleAddProduct)}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          mb={4}
          fontWeight={500}
        >
          Add new product
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              {...register("title")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
              fullWidth
              {...register("price")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={6}
              fullWidth
              {...register("description")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name="category_id" label="Category" control={control}>
              {categoryQuery.data.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  {category.description}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name="brand_id" label="Brand" control={control}>
              {brandQuery.data.map((brand) => (
                <MenuItem key={brand.name} value={brand.id}>
                  {brand.description}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              component="label"
              fullWidth
            >
              Upload Image
              <input hidden accept="image/*" multiple type="file" name="thumbnailfil" ref={register}/>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// title, price, thumbnail, description, category, brand