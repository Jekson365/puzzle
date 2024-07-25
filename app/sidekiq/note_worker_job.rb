class NoteWorkerJob
  include Sidekiq::Job

  def perform
    notes = Note.all
    notes.each do |note|
      if note.reminder_date && note.reminder_date.year == Date.today.year
        ActionCable.server.broadcast "notifications_channel", note: note
      end
    end
  end
end

