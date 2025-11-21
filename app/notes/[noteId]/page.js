'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useNotes } from '@/app/contexts/notesContext'
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Typography,
  Container,
  TextField
} from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  StrikethroughS,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Undo,
  Redo,
  ArrowBack
} from '@mui/icons-material'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const buttonStyle = (isActive) => ({
    color: isActive ? 'primary.main' : 'text.primary',
    backgroundColor: isActive ? 'action.selected' : 'transparent',
    '&:hover': {
      backgroundColor: isActive ? 'action.selected' : 'action.hover',
    },
  })

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 0.5, 
      flexWrap: 'wrap',
      p: 1,
      borderBottom: 1,
      borderColor: 'divider',
      backgroundColor: 'background.paper'
    }}>
      <Tooltip title="Bold (Ctrl+B)">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          sx={buttonStyle(editor.isActive('bold'))}
        >
          <FormatBold fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Italic (Ctrl+I)">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          sx={buttonStyle(editor.isActive('italic'))}
        >
          <FormatItalic fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Strike">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          sx={buttonStyle(editor.isActive('strike'))}
        >
          <StrikethroughS fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Heading 1">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          sx={buttonStyle(editor.isActive('heading', { level: 1 }))}
        >
          <Typography variant="caption" fontWeight="bold">H1</Typography>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 2">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          sx={buttonStyle(editor.isActive('heading', { level: 2 }))}
        >
          <Typography variant="caption" fontWeight="bold">H2</Typography>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 3">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          sx={buttonStyle(editor.isActive('heading', { level: 3 }))}
        >
          <Typography variant="caption" fontWeight="bold">H3</Typography>
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Bullet List">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          sx={buttonStyle(editor.isActive('bulletList'))}
        >
          <FormatListBulleted fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Numbered List">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          sx={buttonStyle(editor.isActive('orderedList'))}
        >
          <FormatListNumbered fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Blockquote">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          sx={buttonStyle(editor.isActive('blockquote'))}
        >
          <FormatQuote fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Code Block">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          sx={buttonStyle(editor.isActive('codeBlock'))}
        >
          <Code fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Undo">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Redo">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

const NoteEditorPage = () => {
  const params = useParams()
  const router = useRouter()
  const { notes, updateNote } = useNotes()
  const [noteTitle, setNoteTitle] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  const currentNote = notes.find(note => note.id === params.noteId)

  useEffect(() => {
    if (notes.length > 0 && !currentNote) {
      router.push('/not-found')
    } else if (currentNote && !isInitialized) {
      setNoteTitle(currentNote.title)
      setIsInitialized(true)
    }
  }, [currentNote, notes.length, router, isInitialized])

  const editor = useEditor({
    extensions: [StarterKit],
    content: currentNote?.content || '<p>Start writing your notes here...</p>',
    immediatelyRender: false,
    editable: true,
    onUpdate: ({ editor }) => {
      if (currentNote && isInitialized) {
        updateNote(currentNote.id, { content: editor.getHTML() })
      }
    },
  }, [params.noteId])

  useEffect(() => {
    if (editor && currentNote && isInitialized) {
      const editorContent = editor.getHTML()
      if (editorContent !== currentNote.content) {
        editor.commands.setContent(currentNote.content, false)
      }
    }
  }, [currentNote?.content, editor, isInitialized])

  const handleTitleBlur = () => {
    if (currentNote && noteTitle.trim()) {
      updateNote(currentNote.id, { title: noteTitle })
    }
  }

  if (!currentNote) {
    return null
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => router.push('/notes')} aria-label="go back">
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Edit Note
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 250px)'
        }}
      >
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="standard"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Note Title"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.75rem',
                fontWeight: 'bold',
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Last updated: {currentNote.updatedAt}
          </Typography>
        </Box>

        <MenuBar editor={editor} />

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 4,
            '& .ProseMirror': {
              minHeight: '400px',
              outline: 'none',
              '& > * + *': {
                marginTop: '0.75em',
              },
              '& h1': {
                fontSize: '2rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
              },
              '& h2': {
                fontSize: '1.5rem',
                fontWeight: 'bold',
                lineHeight: 1.3,
              },
              '& h3': {
                fontSize: '1.25rem',
                fontWeight: 'bold',
                lineHeight: 1.4,
              },
              '& code': {
                backgroundColor: 'action.hover',
                padding: '0.2em 0.4em',
                borderRadius: '3px',
                fontSize: '0.9em',
                fontFamily: 'monospace',
              },
              '& pre': {
                backgroundColor: 'action.hover',
                padding: '1em',
                borderRadius: '8px',
                overflowX: 'auto',
                '& code': {
                  backgroundColor: 'transparent',
                  padding: 0,
                },
              },
              '& blockquote': {
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                paddingLeft: '1em',
                marginLeft: 0,
                fontStyle: 'italic',
              },
              '& ul': {
                paddingLeft: '1.5em',
                listStyleType: 'disc',
              },
              '& ol': {
                paddingLeft: '1.5em',
                listStyleType: 'decimal',
              },
              '& li': {
                marginTop: '0.25em',
              },
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Paper>
    </Container>
  )
}

export default NoteEditorPage

