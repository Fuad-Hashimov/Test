export default function postFormData(page = 1, perPage = 12, cat_id = null) {
  let formData = new FormData();
  formData.append("high_detail", "1");
  formData.append("exclude_non_vis", "1");
  formData.append("tn_size", "8");
  formData.append("tn_crop", "1");
  formData.append("tn_type", "1");
  formData.append("dnsv", "3");
  formData.append("page", page);
  formData.append("per_page", perPage);
  if (cat_id) {
    formData.append("cat_id", cat_id);
  }
  formData.append("exclude_asi", "true");
  formData.append("exclude_free_form", "true");
  formData.append("requesting_quote", "true");
  return formData;
}
