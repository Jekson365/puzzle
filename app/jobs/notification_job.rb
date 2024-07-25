class NotificationJob < ApplicationJob
  queue_as :default

  def perform
    notes = Note.where(notification_date: Date.current)

    notes.each do |note|
      NotificationMailer.notify(note).deliver_later
    end
  end
end
