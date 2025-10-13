import { createShortUrlPostBodySchema, updateLongUrlPostBodySchema } from "../validations/url.validation.js";
import prettifyError from "../utils/customError.js";
import { nanoid } from "nanoid";
import {
  deleteShortCode,
  getAllUrlByUserId,
  getUrlByShortCode,
  insertUrl, updateLongUrl,
  visitUrlByShortCode
} from "../utils/dbHelpers.js";


export const createShortUrl = async (req, res) => {
  try {
    const userId = req.user?.id
    const validationResult = await createShortUrlPostBodySchema.safeParseAsync(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: prettifyError(validationResult.error) });
    }
    const { longUrl, shortCode } = validationResult.data;
    const code = shortCode ?? nanoid(6)

    const newUrlMapping = await insertUrl(longUrl, code, userId);

    return res.status(200).json(newUrlMapping);
  } catch (e) {
    return res.status(500).json({ error: e?.message || e });
  }
}

export const getAllShortUrls = async (req, res) => {
  const userId = req.user?.id
  const urls = await getAllUrlByUserId(userId);
  return res.status(200).json({ data: urls });
}

export const updateLongUrlByShortCode = async (req, res) => {
  try {
    const validationResult = await updateLongUrlPostBodySchema.safeParseAsync(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: prettifyError(validationResult.error) });
    }
    const { longUrl, shortCode } = validationResult.data;
    const existingUrl = await getUrlByShortCode(shortCode, req.user?.id)
    if (!existingUrl) {
      return res.status(403).json({ error: "the shortcode does not exist or you do not own the shortCode" });
    }
    const updatedUrl = await updateLongUrl(longUrl, shortCode)
    if (!updatedUrl) {
      return res.status(400).json({ error: "Bad Request" });
    }
    return res.status(200).json({ data: updatedUrl });
  } catch (e) {
    return res.status(500).json({ error: e?.message || e });
  }
}

export const deleteShortUrl = async (req, res) => {
  try {

    const shortCode = req.params?.shortCode
    const userId = req.user?.id
    const urlMapping = await getUrlByShortCode(shortCode, userId);
    if (!urlMapping) {
      return res.status(403).json({ error: "the given shortCode does not exist or it does not belong to you" });
    }
    await deleteShortCode(shortCode, userId);
    return res.status(204).json({ data: "successfully deleted shortcode entry!!" });
  } catch (e) {
    return res.status(500).json({ error: e?.message || e });
  }
}


export const visitShortUrl = async (req, res) => {
  try {
    const code = req.params?.shortCode
    const result = await visitUrlByShortCode(code)
    if (!result || !result?.longUrl) {
      return res.status(400).json({ error: "no url found for shortCode" });
    }
    return res.redirect(result?.longUrl)
  } catch (e) {
    return res.status(500).json({ error: e?.message || e });
  }
}
