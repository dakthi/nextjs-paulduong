// Dynamic imports to avoid build-time issues
let pdfParse: any;
let mammoth: any;

// Only import in runtime
if (typeof window === 'undefined') {
  // Server-side only
  pdfParse = require('pdf-parse');
  mammoth = require('mammoth');
}

export interface ProcessedContent {
  text: string;
  wordCount: number;
  readingTime: number; // in minutes
  keywords: string[];
  summary: string;
  language: string;
}

export class TextProcessor {
  constructor() {
    // Simple implementation without Natural.js to avoid Node.js compatibility issues
  }

  /**
   * Extract text from different file types
   */
  async extractText(buffer: Buffer, mimeType: string): Promise<string> {
    try {
      switch (mimeType) {
        case 'application/pdf':
          return await this.extractFromPDF(buffer);
        
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          return await this.extractFromDocx(buffer);
        
        case 'text/plain':
          return buffer.toString('utf-8');
        
        default:
          throw new Error(`Unsupported file type: ${mimeType}`);
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error('Failed to extract text from document');
    }
  }

  /**
   * Extract text from PDF
   */
  private async extractFromPDF(buffer: Buffer): Promise<string> {
    if (!pdfParse) {
      throw new Error('PDF parsing not available in this environment');
    }
    const data = await pdfParse(buffer);
    return data.text;
  }

  /**
   * Extract text from DOCX
   */
  private async extractFromDocx(buffer: Buffer): Promise<string> {
    if (!mammoth) {
      throw new Error('DOCX parsing not available in this environment');
    }
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  /**
   * Process text and extract insights
   */
  async processText(text: string): Promise<ProcessedContent> {
    const cleanText = this.cleanText(text);
    const wordCount = this.getWordCount(cleanText);
    const readingTime = this.calculateReadingTime(wordCount);
    const keywords = this.extractKeywords(cleanText);
    const summary = this.generateSummary(cleanText);
    const language = this.detectLanguage(cleanText);

    return {
      text: cleanText,
      wordCount,
      readingTime,
      keywords,
      summary,
      language
    };
  }

  /**
   * Clean and normalize text
   */
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();
  }

  /**
   * Count words in text
   */
  private getWordCount(text: string): number {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  /**
   * Calculate estimated reading time (250 words per minute average)
   */
  private calculateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 250);
  }

  /**
   * Extract keywords using simple frequency analysis
   */
  private extractKeywords(text: string, limit: number = 10): string[] {
    const words = this.tokenizeWords(text.toLowerCase());
    const cleanWords = this.removeStopwords(words);
    
    // Count word frequency
    const wordFreq: { [key: string]: number } = {};
    cleanWords.forEach(word => {
      if (word.length > 2) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    // Sort by frequency and return top keywords
    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([word]) => word);
  }

  /**
   * Generate a simple extractive summary
   */
  private generateSummary(text: string, maxSentences: number = 3): string {
    const sentences = this.tokenizeSentences(text);
    
    if (sentences.length <= maxSentences) {
      return text;
    }

    // Score sentences based on keyword frequency
    const keywords = this.extractKeywords(text, 20);
    const sentenceScores: { sentence: string; score: number }[] = [];

    sentences.forEach(sentence => {
      let score = 0;
      const sentenceWords = this.tokenizeWords(sentence.toLowerCase());
      
      sentenceWords.forEach(word => {
        if (keywords.includes(word)) {
          score += 1;
        }
      });

      sentenceScores.push({ sentence, score });
    });

    // Return top scoring sentences
    return sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSentences)
      .map(item => item.sentence)
      .join(' ');
  }

  /**
   * Simple language detection (Vietnamese vs English)
   */
  private detectLanguage(text: string): string {
    // Simple heuristic: check for Vietnamese characters
    const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    
    if (vietnameseChars.test(text)) {
      return 'vi';
    }
    
    return 'en';
  }

  /**
   * Process text for search indexing
   */
  processForSearch(text: string): string[] {
    const words = this.tokenizeWords(text.toLowerCase());
    const cleanWords = this.removeStopwords(words);
    
    // Filter out short words and non-alphabetic terms
    return cleanWords.filter(word => 
      word.length > 2 && 
      /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+$/.test(word)
    );
  }

  /**
   * Simple word tokenization
   */
  private tokenizeWords(text: string): string[] {
    return text.trim().split(/\s+/).filter(word => word.length > 0);
  }

  /**
   * Simple sentence tokenization
   */
  private tokenizeSentences(text: string): string[] {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);
  }

  /**
   * Remove stopwords from word array
   */
  private removeStopwords(words: string[]): string[] {
    const englishStopwords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with'];
    const vietnameseStopwords = ['và', 'của', 'có', 'là', 'trong', 'với', 'để', 'được', 'một', 'các', 'này', 'đó', 'như', 'từ', 'cho', 'về', 'theo', 'khi', 'đã', 'sẽ', 'bằng', 'những', 'tại', 'sau', 'trước', 'đến', 'đang', 'làm', 'ra', 'nhiều', 'hơn', 'cũng', 'lại', 'đây', 'đấy', 'thì', 'vào', 'mà', 'chỉ', 'nếu', 'phải', 'nào', 'đều', 'rất', 'còn', 'người', 'năm', 'thế'];
    
    const allStopwords = [...englishStopwords, ...vietnameseStopwords];
    
    return words.filter(word => !allStopwords.includes(word.toLowerCase()));
  }
}

export const textProcessor = new TextProcessor();